package com.example.travel.model;

import java.util.List;

public record Demand(
        String rawText,
        String destination,
        int days,
        int budget,
        List<String> interests,
        PaceType pace,
        String constraints
) {
    public Demand normalize() {
        String normalizedDestination = destination == null || destination.isBlank() ? "北京" : destination.trim();
        int normalizedDays = Math.max(1, Math.min(days <= 0 ? 3 : days, 7));
        int normalizedBudget = Math.max(300, budget <= 0 ? 1800 : budget);
        List<String> normalizedInterests = interests == null || interests.isEmpty() ? List.of("历史") : interests;
        return new Demand(
                rawText == null ? "" : rawText.trim(),
                normalizedDestination,
                normalizedDays,
                normalizedBudget,
                normalizedInterests,
                pace == null ? PaceType.balanced : pace,
                constraints == null ? "" : constraints.trim()
        );
    }
}
