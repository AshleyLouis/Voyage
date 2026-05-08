package com.example.travel.service;

import com.example.travel.model.Demand;
import com.example.travel.model.PaceType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DemandParseService {
    private static final List<String> INTERESTS = List.of("历史", "美食", "自然", "购物", "休闲", "拍照");
    private static final List<String> CITIES = List.of("北京", "杭州");

    public Demand parse(String text) {
        String raw = text == null ? "" : text.trim();
        String city = CITIES.stream().filter(raw::contains).findFirst().orElse("北京");
        int days = extractInt(raw, Pattern.compile("(\\d+)\\s*天"), 3);
        int budget = extractInt(raw, Pattern.compile("预算\\s*(\\d+)|(\\d+)\\s*元"), 1800);
        List<String> interests = INTERESTS.stream().filter(raw::contains).toList();
        PaceType pace = inferPace(raw);
        return new Demand(raw, city, days, budget, interests, pace, raw).normalize();
    }

    public List<String> interests() {
        return INTERESTS;
    }

    private int extractInt(String text, Pattern pattern, int fallback) {
        Matcher matcher = pattern.matcher(text);
        if (!matcher.find()) {
            return fallback;
        }
        for (int i = 1; i <= matcher.groupCount(); i++) {
            if (matcher.group(i) != null) {
                return Integer.parseInt(matcher.group(i));
            }
        }
        return fallback;
    }

    private PaceType inferPace(String text) {
        if (text.contains("轻松") || text.contains("慢") || text.contains("不累") || text.contains("少走路")) {
            return PaceType.relaxed;
        }
        if (text.contains("紧凑") || text.contains("多玩") || text.contains("充实")) {
            return PaceType.compact;
        }
        return PaceType.balanced;
    }
}
