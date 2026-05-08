package com.example.travel.model;

import java.util.List;

public record DayPlan(
        int dayNo,
        List<ScoredSpot> spots,
        int travelMinutes,
        double totalHours,
        FatigueLevel fatigue,
        String routeReason
) {
}
