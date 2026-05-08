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
                {0, 18, 42, 15, 12, 10, 90, 35, 300, 310},
                {18, 0, 48, 28, 25, 16, 95, 42, 305, 315},
                {42, 48, 0, 38, 32, 45, 72, 58, 285, 296},
                {15, 28, 38, 0, 8, 14, 86, 30, 302, 312},
                {12, 25, 32, 8, 0, 16, 80, 32, 300, 311},
                {10, 16, 45, 14, 16, 0, 92, 38, 306, 316},
                {90, 95, 72, 86, 80, 92, 0, 96, 260, 270},
                {35, 42, 58, 30, 32, 38, 96, 0, 318, 328},
                {300, 305, 285, 302, 300, 306, 260, 318, 0, 22},
                {310, 315, 296, 312, 311, 316, 270, 328, 22, 0}
        };
    }

    public List<ScenicSpot> findAll() {
        return List.copyOf(spots);
    }

    public Optional<ScenicSpot> findById(int id) {
        return Optional.ofNullable(byId.get(id));
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

    public Set<ScenicSpot> recallByTags(String city, List<String> tags) {
        Set<ScenicSpot> result = new LinkedHashSet<>();
        for (String tag : tags) {
            byTag.getOrDefault(tag, List.of()).stream()
                    .filter(spot -> spot.city().equals(city))
                    .forEach(result::add);
        }
        if (result.isEmpty()) {
            result.addAll(byCity.getOrDefault(city, List.of()));
        }
        return result;
    }

    private String searchableText(ScenicSpot spot) {
        return String.join(" ", spot.name(), spot.city(), spot.category(), spot.desc(), String.join(" ", spot.tags()))
                .toLowerCase(Locale.ROOT);
    }

    private boolean isAll(String value) {
        return value == null || value.isBlank() || "all".equalsIgnoreCase(value.trim());
    }

    private void seedSpots() {
        spots.add(new ScenicSpot(1, "故宫博物院", "北京", "历史文化", 60, 4, "08:30", "17:00", 98,
                List.of("历史", "拍照"), "红墙金瓦与宫廷历史，是第一次到北京最值得安排的核心景点。",
                "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(2, "天坛公园", "北京", "历史文化", 34, 2.5, "06:00", "21:00", 88,
                List.of("历史", "休闲", "拍照"), "建筑庄重、园区舒展，适合放在上午或午后慢慢游览。",
                "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(3, "颐和园", "北京", "自然风景", 30, 3.5, "06:30", "20:00", 92,
                List.of("自然", "历史", "拍照"), "湖景、长廊和皇家园林结合，适合自然与拍照偏好的旅行者。",
                "https://images.unsplash.com/photo-1625904835715-e9d2f9f23e89?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(4, "南锣鼓巷", "北京", "美食街区", 0, 2, "10:00", "22:00", 84,
                List.of("美食", "购物", "休闲"), "胡同、小吃和文创店集中，适合晚间补充城市生活体验。",
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(5, "什刹海", "北京", "休闲夜游", 0, 2, "09:00", "23:00", 82,
                List.of("休闲", "美食", "拍照"), "水岸、胡同和夜景氛围轻松，适合作为一天行程的收尾。",
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(6, "王府井", "北京", "购物美食", 0, 2, "10:00", "22:00", 86,
                List.of("购物", "美食"), "商业街区交通方便，适合安排餐饮、购物和自由活动。",
                "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(7, "八达岭长城", "北京", "历史自然", 40, 5, "06:30", "19:00", 95,
                List.of("历史", "自然", "拍照"), "北京标志性景点，适合单独安排半天以上，体力消耗偏高。",
                "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(8, "798 艺术区", "北京", "艺术休闲", 0, 2.5, "10:00", "19:00", 80,
                List.of("休闲", "拍照", "购物"), "展览、咖啡馆和工业风街区，适合年轻人和拍照路线。",
                "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(9, "西湖", "杭州", "自然风景", 0, 4, "00:00", "23:59", 96,
                List.of("自然", "休闲", "拍照"), "湖景和城市生活相连，适合轻松型旅行与拍照路线。",
                "https://images.unsplash.com/photo-1628237214979-37d2a2258041?auto=format&fit=crop&w=900&q=80"));
        spots.add(new ScenicSpot(10, "河坊街", "杭州", "美食街区", 0, 2, "09:00", "22:00", 82,
                List.of("美食", "购物", "历史"), "传统街区和小吃集中，适合安排在西湖路线后的晚间。",
                "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80"));
    }
}
