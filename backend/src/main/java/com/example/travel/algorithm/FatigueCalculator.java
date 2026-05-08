package com.example.travel.algorithm;

import com.example.travel.model.FatigueLevel;
import com.example.travel.model.PaceType;

public class FatigueCalculator {
    public FatigueLevel calculate(double totalHours, int spotCount, int travelMinutes, PaceType pace) {
        double hourPressure = totalHours / pace.getMaxHours();
        double spotPressure = spotCount / (double) pace.getMaxSpots();
        double trafficPressure = travelMinutes / 180.0;
        double score = (hourPressure * 45 + spotPressure * 35 + trafficPressure * 20) * pace.getFatigueFactor();
        if (score < 70) {
            return new FatigueLevel("舒适", "low", round(score));
        }
        if (score < 96) {
            return new FatigueLevel("适中", "medium", round(score));
        }
        return new FatigueLevel("较满", "high", round(score));
    }

    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
