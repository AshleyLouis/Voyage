package com.example.travel.repository;

import com.example.travel.model.ScenicSpot;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Repository
public class SpotRepository {
    private final List<ScenicSpot> spots = new ArrayList<>();
    private final Map<Integer, ScenicSpot> byId = new HashMap<>();
    private final Map<String, List<ScenicSpot>> byCity = new HashMap<>();
    private final Map<String, List<ScenicSpot>> byCategory = new HashMap<>();
    private final Map<String, List<ScenicSpot>> byTag = new HashMap<>();
    private int[][] travelMinutes;

    @PostConstruct
    public void init() {
        seedSpots();
        indexSpots();
        travelMinutes = new int[][]{
                {0, 12, 28, 18, 24, 20, 30, 32, 16, 36, 14, 26, 34, 22, 20},
                {12, 0, 24, 14, 18, 16, 26, 28, 12, 34, 10, 24, 32, 18, 16},
                {28, 24, 0, 22, 20, 28, 36, 18, 26, 42, 26, 30, 44, 16, 22},
                {18, 14, 22, 0, 16, 14, 24, 26, 18, 32, 12, 20, 30, 16, 12},
                {24, 18, 20, 16, 0, 12, 18, 22, 24, 30, 18, 16, 26, 14, 16},
                {20, 16, 28, 14, 12, 0, 16, 24, 22, 26, 18, 14, 24, 18, 14},
                {30, 26, 36, 24, 18, 16, 0, 28, 34, 20, 28, 18, 18, 24, 22},
                {32, 28, 18, 26, 22, 24, 28, 0, 30, 38, 30, 26, 36, 20, 26},
                {16, 12, 26, 18, 24, 22, 34, 30, 0, 40, 14, 28, 36, 22, 20},
                {36, 34, 42, 32, 30, 26, 20, 38, 40, 0, 34, 22, 16, 32, 30},
                {14, 10, 26, 12, 18, 18, 28, 30, 14, 34, 0, 22, 32, 18, 14},
                {26, 24, 30, 20, 16, 14, 18, 26, 28, 22, 22, 0, 20, 18, 20},
                {34, 32, 44, 30, 26, 24, 18, 36, 36, 16, 32, 20, 0, 30, 28},
                {22, 18, 16, 16, 14, 18, 24, 20, 22, 32, 18, 18, 30, 0, 16},
                {20, 16, 22, 12, 16, 14, 22, 26, 20, 30, 14, 20, 28, 16, 0}
        };
    }

    public List<ScenicSpot> findAll() {
        return List.copyOf(spots);
    }

    public Optional<ScenicSpot> findById(int id) {
        return Optional.ofNullable(byId.get(id));
    }

    public List<ScenicSpot> recoveryNodes(String city) {
        return byCity.getOrDefault(city, List.of()).stream()
                .filter(ScenicSpot::isRecoveryNode)
                .toList();
    }

    public List<ScenicSpot> search(String city, String category, String keyword) {
        Collection<ScenicSpot> base = isAll(city)
                ? spots
                : byCity.getOrDefault(city.trim(), List.of());
        String normalizedKeyword = keyword == null ? "" : keyword.trim().toLowerCase(Locale.ROOT);
        return base.stream()
                .filter(spot -> isAll(category) || spot.category().equals(category.trim()))
                .filter(spot -> normalizedKeyword.isBlank() || searchableText(spot).contains(normalizedKeyword))
                .toList();
    }

    public List<String> cities() {
        return byCity.keySet().stream().sorted().toList();
    }

    public List<String> categories() {
        return byCategory.keySet().stream().sorted().toList();
    }

    public int[][] travelMinutes() {
        int[][] copy = new int[travelMinutes.length][];
        for (int i = 0; i < travelMinutes.length; i++) {
            copy[i] = travelMinutes[i].clone();
        }
        return copy;
    }

    public Set<ScenicSpot> recallByTags(String city, List<String> tags) {
        Set<ScenicSpot> result = new LinkedHashSet<>();
        for (String tag : tags) {
            byTag.getOrDefault(tag, List.of()).stream()
                    .filter(spot -> spot.city().equals(city))
                    .filter(spot -> !spot.isRecoveryNode())
                    .forEach(result::add);
        }
        if (result.isEmpty()) {
            byCity.getOrDefault(city, List.of()).stream()
                    .filter(spot -> !spot.isRecoveryNode())
                    .forEach(result::add);
        }
        return result;
    }

    private void indexSpots() {
        for (ScenicSpot spot : spots) {
            byId.put(spot.id(), spot);
            byCity.computeIfAbsent(spot.city(), ignored -> new ArrayList<>()).add(spot);
            byCategory.computeIfAbsent(spot.category(), ignored -> new ArrayList<>()).add(spot);
            for (String tag : spot.tags()) {
                byTag.computeIfAbsent(tag, ignored -> new ArrayList<>()).add(spot);
            }
        }
    }

    private String searchableText(ScenicSpot spot) {
        return String.join(" ", spot.name(), spot.city(), spot.district(), spot.category(), spot.description(), String.join(" ", spot.tags()))
                .toLowerCase(Locale.ROOT);
    }

    private boolean isAll(String value) {
        return value == null || value.isBlank() || "all".equalsIgnoreCase(value.trim());
    }

    private void seedSpots() {
        spots.add(spot(1, "武侯祠", "武侯区", "历史文化", 50, 2.5, 96, List.of("历史", "拍照"), false, 0.56, 0.62, 0.58, 0.38, 0.10, "三国文化核心景点，信息密度较高，适合作为成都人文路线起点。"));
        spots.add(spot(2, "锦里古街", "武侯区", "美食街区", 0, 1.8, 91, List.of("美食", "购物", "拍照"), false, 0.42, 0.32, 0.78, 0.50, 0.28, "紧邻武侯祠，适合衔接小吃与夜景，但节假日拥挤感明显。"));
        spots.add(spot(3, "杜甫草堂", "青羊区", "历史文化", 50, 2.5, 92, List.of("历史", "自然", "休闲"), false, 0.48, 0.64, 0.42, 0.22, 0.24, "诗意园林与文化展陈结合，节奏较舒缓。"));
        spots.add(spot(4, "宽窄巷子", "青羊区", "历史街区", 0, 2.0, 89, List.of("历史", "美食", "购物", "拍照"), false, 0.40, 0.36, 0.82, 0.44, 0.18, "成都老街巷代表，适合拍照和休闲，但高峰时段人流压力较高。"));
        spots.add(spot(5, "人民公园", "青羊区", "公园休闲", 0, 1.2, 86, List.of("休闲", "自然"), true, 0.16, 0.12, 0.28, 0.08, 0.88, "茶馆、湖边和慢节奏步道，是典型午间恢复节点。"));
        spots.add(spot(6, "春熙路", "锦江区", "购物商圈", 0, 1.8, 94, List.of("购物", "美食", "拍照"), false, 0.42, 0.24, 0.86, 0.34, 0.16, "核心商圈，覆盖度高，但人流和停留诱惑会抬高疲劳风险。"));
        spots.add(spot(7, "太古里", "锦江区", "休闲商圈", 0, 1.6, 93, List.of("购物", "美食", "休闲", "拍照"), true, 0.26, 0.18, 0.62, 0.20, 0.64, "开放式街区和餐饮密集，可作为购物路线中的轻恢复节点。"));
        spots.add(spot(8, "成都博物馆", "青羊区", "博物馆", 0, 2.2, 88, List.of("历史", "拍照"), false, 0.28, 0.78, 0.48, 0.30, 0.12, "展陈信息密度高，适合文化偏好用户，但连续参观会增加认知负担。"));
        spots.add(spot(9, "文殊院", "青羊区", "历史文化", 0, 1.8, 84, List.of("历史", "休闲", "美食"), false, 0.32, 0.46, 0.36, 0.16, 0.30, "寺院街区节奏平稳，周边小吃适合轻松衔接。"));
        spots.add(spot(10, "东郊记忆", "成华区", "艺术街区", 0, 2.0, 82, List.of("拍照", "购物", "休闲"), false, 0.44, 0.38, 0.52, 0.18, 0.22, "工业风街区，适合年轻用户拍照和文创体验。"));
        spots.add(spot(11, "鹤鸣茶社", "青羊区", "茶馆休息", 0, 0.9, 83, List.of("休闲", "美食"), true, 0.08, 0.08, 0.30, 0.06, 0.95, "人民公园内代表性茶社，适合在高负担节点后安排 40 分钟恢复。"));
        spots.add(spot(12, "建设路小吃街", "成华区", "美食街区", 0, 1.5, 87, List.of("美食", "购物"), false, 0.36, 0.18, 0.76, 0.42, 0.20, "夜间美食选择丰富，适合收尾，但排队风险较高。"));
        spots.add(spot(13, "望平街咖啡带", "锦江区", "咖啡休息", 0, 1.0, 80, List.of("休闲", "美食"), true, 0.10, 0.10, 0.34, 0.08, 0.86, "河边咖啡与轻餐集中，适合作为跨区移动后的恢复节点。"));
        spots.add(spot(14, "青羊宫", "青羊区", "历史文化", 10, 1.5, 79, List.of("历史", "休闲"), false, 0.30, 0.42, 0.28, 0.10, 0.28, "文化密度适中，和杜甫草堂、人民公园可形成低压路线。"));
        spots.add(spot(15, "奎星楼街", "青羊区", "美食街区", 0, 1.4, 85, List.of("美食", "休闲", "拍照"), false, 0.30, 0.20, 0.66, 0.34, 0.24, "餐饮与小店密集，适合晚间慢逛。"));
    }

    private ScenicSpot spot(int id, String name, String district, String category, int ticketPrice, double stayDuration,
                            int popularity, List<String> tags, boolean recoveryNode, double physicalLoad,
                            double cognitiveLoad, double crowdLoad, double queueLoad, double recoveryValue,
                            String description) {
        return new ScenicSpot(
                id,
                name,
                "成都",
                district,
                district + "核心旅游圈",
                104.0 + id * 0.006,
                30.6 + id * 0.004,
                category,
                ticketPrice,
                stayDuration,
                "09:00",
                "21:00",
                popularity,
                tags,
                description,
                "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
                recoveryNode,
                physicalLoad,
                cognitiveLoad,
                crowdLoad,
                queueLoad,
                recoveryValue
        );
    }
}
