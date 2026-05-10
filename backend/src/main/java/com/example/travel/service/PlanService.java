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
    private final RhythmEngineService rhythmEngineService;
    private final FloydShortestPath floyd = new FloydShortestPath();
    private final TspDpPlanner tsp = new TspDpPlanner();
    private final FatigueCalculator fatigueCalculator = new FatigueCalculator();

    public PlanService(SpotRepository spotRepository, RecallService recallService, RhythmEngineService rhythmEngineService) {
        this.spotRepository = spotRepository;
        this.recallService = recallService;
        this.rhythmEngineService = rhythmEngineService;
    }

    public TravelPlan generate(Demand demand) {
        return generate(demand.normalize(), null, 1, null, null);
    }

    public TravelPlan generate(Demand demand, String parentPlanId, int versionNo, Integer mustSpotId, Integer removeSpotId) {
        Demand normalized = demand.normalize();
        List<ScoredSpot> selected = recallService.recall(normalized, mustSpotId, removeSpotId);
        int[][] dist = floyd.shortestDistances(spotRepository.travelMinutes());
        List<DayPlan> days = splitIntoDays(selected, normalized, dist);
        int totalTicket = selected.stream().mapToInt(item -> item.spot().ticketPrice()).sum();
        int transportCost = days.stream().mapToInt(day -> (int) Math.round(day.travelMinutes() * 0.8)).sum();
        int foodAndLocal = normalized.days() * 220;
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
                normalized.destination() + normalized.days() + "日动态节奏路线，共推荐 " + selected.size() + " 个主要景点，并按需插入恢复节点。",
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
            RhythmEngineService.RhythmResult rhythm = rhythmEngineService.apply(demand, ordered, dist);
            String routeReason = ordered.isEmpty()
                    ? "当天保留自由探索或机动休息。"
                    : "先使用 Floyd-Warshall 与 TSP 优化访问顺序，再由节奏引擎检查状态转移并插入恢复节点。";
            days.add(new DayPlan(
                    i + 1,
                    ordered,
                    rhythm.nodes(),
                    rhythm.travelMinutes(),
                    rhythm.totalHours(),
                    fatigueCalculator.calculate(rhythm.fatigueRisk(), demand.pace()),
                    rhythm.finalState(),
                    rhythm.fatigueRisk(),
                    routeReason,
                    rhythm.interventions()
            ));
        }
        return days;
    }

    private List<String> buildExplanations(Demand demand, List<ScoredSpot> selected, List<DayPlan> days, int totalCost) {
        List<String> result = new ArrayList<>();
        result.add("地图范围固定为成都主城区核心旅游圈，先通过城市与兴趣标签哈希索引召回候选景点。");
        result.add("候选排序使用 Top-K 优先队列，评分同时考虑兴趣、热度、预算和用户节奏画像。");
        result.add("路线顺序使用 Floyd-Warshall 交通代价矩阵与 TSP 状态压缩 DP，随后进入动态节奏控制。");
        long recoveryCount = days.stream().flatMap(day -> day.nodes().stream()).filter(node -> node.isRecoveryNode()).count();
        result.add("节奏引擎模拟 RELAXED、STABLE、FATIGUED、OVERLOADED 四种状态，本次共插入 " + recoveryCount + " 个恢复节点。");
        result.add("当前方案估算费用约 " + totalCost + " 元，用户预算为 " + demand.budget() + " 元。");
        if (!selected.isEmpty()) {
            result.add("最高匹配景点是 " + selected.get(0).spot().name() + "，原因：" + selected.get(0).reason());
        }
        return result;
    }

    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
