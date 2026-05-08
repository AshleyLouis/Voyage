package com.example.travel.model;

import java.util.List;

public record ScenicSpot(
        int id,
        String name,
        String city,
        String category,
        int ticket,
        double duration,
        String open,
        String close,
        int popularity,
        List<String> tags,
        String desc,
        String image
) {
}
