package com.hiresmart.controller;

import com.hiresmart.dto.CandidateMatch;
import com.hiresmart.model.Resume;
import com.hiresmart.service.MatchingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final MatchingService matchingService;

    public SearchController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    @PostMapping
    public List<CandidateMatch> searchCandidates(
            @RequestBody String jobDescription) {

        return matchingService.matchCandidates(jobDescription);
    }
}