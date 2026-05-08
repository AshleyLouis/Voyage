package com.example.travel.service;

import com.example.travel.algorithm.FatigueCalculator;
import com.example.travel.algorithm.FloydShortestPath;
import com.example.travel.algorithm.TspDpPlanner;
import com.example.travel.model.DayPlan;
import com.example.travel.model.Demand;
import com.example.travel.model.ScoredSpot;
import com.example.travel.model.TravelPlan;
import com.example.travel.repository.SpotRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class PlanService {
    private final SpotRepository spotRepository;
    private final RecallService recallService;
    private final FloydShortestPath floyd = new FloydShortestPath();
    private final TspDpPlanner tsp = new TspDpPlanner();
    private final FatigueCalculator fatigueCalculator = new FatigueCalculator();

    public PlanService(SpotRepository spotRepository, RecallService recallService) {
        this.spotRepository = spotRepository;
        this.recallService = recallService;
    }

    public TravelPlan generate(Demand demand) {
        return generate(demand.normalize(), null, 1, null, null);
    }

    public TravelPlan generate(Demand demand, String parentPlanId, int versionNo, Integer mustSpotId, Integer removeSpotId) {
        Demand normalized = demand.normalize();
        List<ScoredSpot> selected = recallService.recall(normalized, mustSpotId, removeSpotId);
        int[][] dist = floyd.shortestDistances(spotRepository.travelMinutes());
        List<DayPlan> days = splitIntoDays(selected, normalized, dist);
        int totalTicket = selected.stream().mapToInt(item -> item.spot().ticket()).sum();
        int transportCost = days.stream().mapToInt(day -> (int) Math.round(day.travelMinutes() * 0.8)).sum();
        int foodAndLocal = normalized.days() * 260;
        int totalCost = totalTicket + transportCost + foodAndLocal;
        double totalHours = days.stream().mapToDouble(DayPlan::totalHours).sum();
        int match = selected.isEmpty()
                ? 0
                : (int) Math.round(selected.stream().mapToDouble(ScoredSpot::score).average().orElse(0) * 100);
        List<String> explanations = buildExplanations(normalized, selected, days, totalCost);
        return new TravelPlan(
                "PLAN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(),
                normalized,
                selected,
                days,
                totalCost,
                round(totalHours),
                match,
                normalized.destination() + normalized.days() + "日个性化路线，共推荐" + selected.size() + "个景点。",
                explanations,
                parentPlanId,
                versionNo
        );
    }

    private List<DayPlan> splitIntoDays(List<ScoredSpot> selected, Demand demand, int[][] dist) {
        List<List<ScoredSpot>> buckets = new ArrayList<>();
        for (int i = 0; i < demand.days(); i++) {
            buckets.add(new ArrayList<>());
        }
        List<ScoredSpot> orderedByScore = selected.stream()
                .sorted(Comparator.comparingDouble(ScoredSpot::score).reversed())
                .toList();
        for (ScoredSpot spot : orderedByScore) {
            List<ScoredSpot> target = buckets.stream()
                    .filter(bucket -> bucket.size() < demand.pace().getMaxSpots())
                    .min(Comparator.comparingInt(List::size))
                    .orElse(buckets.get(0));
            target.add(spot);
        }

        List<DayPlan> days = new ArrayList<>();
        for (int i = 0; i < buckets.size(); i++) {
            List<ScoredSpot> ordered = tsp.order(buckets.get(i), dist);
            int travelMinutes = tsp.travelMinutes(ordered, dist);
            double totalHours = ordered.stream().mapToDouble(item -> item.spot().duration()).sum() + travelMinutes / 60.0;
            String routeReason = ordered.isEmpty()
                    ? "当天留作自由探索或机动休息。"
                    : "使用TSP状态压缩动态规划优化当天访问顺序，并结合Floyd最短路矩阵降低交通时间。";
            days.add(new DayPlan(
                    i + 1,
                    ordered,
                    travelMinutes,
                    round(totalHours),
                    fatigueCalculator.calculate(totalHours, ordered.size(), travelMinutes, demand.pace()),
                    routeReason
            ));
        }
        return days;
    }

    private List<String> buildExplanations(Demand demand, List<ScoredSpot> selected, List<DayPlan> days, int totalCost) {
        List<String> result = new ArrayList<>();
        result.add("先通过城市与兴趣标签哈希索引召回候选景点，再用Top-K优先队列保留高匹配候选。");
        result.add("路线顺序使用Floyd-Warshall预处理后的交通代价矩阵，并按每日景点集合执行TSP状态压缩DP。");
        result.add("当前方案预算估算约" + totalCost + "元，用户预算为" + demand.budget() + "元。");
        long highFatigueDays = days.stream().filter(day -> "high".equals(day.fatigue().level())).count();
        result.add(highFatigueDays == 0
                ? "疲劳度控制通过每日景点数、总时长和交通时间综合评估，当前没有明显过载日。"
                : "有" + highFatigueDays + "天行程偏满，建议切换轻松节奏或删除一个景点。");
        if (!selected.isEmpty()) {
            result.add("最高匹配景点是" + selected.get(0).spot().name() + "，原因：" + selected.get(0).reason());
        }
        return result;
    }

    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
