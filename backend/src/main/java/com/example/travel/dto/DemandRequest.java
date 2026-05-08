package com.example.travel.dto;

import com.example.travel.model.Demand;
import com.example.travel.model.PaceType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.util.List;

public record DemandRequest(
        String rawText,
        String destination,
        @Min(1) @Max(7) Integer days,
        @Min(300) Integer budget,
        List<String> interests,
        String pace,
        String constraints
) {
    public Demand toDemand() {
        return new Demand(
                rawText,
                destination,
                days == null ? 3 : days,
                budget == null ? 1800 : budget,
                interests,
                PaceType.from(pace),
                constraints
        ).normalize();
    }
}
