package com.example.travel.dto;

public record ReplanRequest(
        DemandRequest demand,
        String parentPlanId,
        Integer versionNo,
        Integer newBudget,
        String newPace,
        Integer removeSpotId,
        Integer mustSpotId
) {
}
