package com.hiresmart.dto;

import lombok.Data;

@Data
public class CandidateMatch {

    private Long id;

    private String name;

    private String resumePreview;

    private double score;
}