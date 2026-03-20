package com.hiresmart.service;

import com.hiresmart.dto.CandidateMatch;
import com.hiresmart.model.Resume;
import com.hiresmart.repository.ResumeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchingService {

    private final VectorService vectorService;
    private final ResumeRepository resumeRepository;

    public MatchingService(VectorService vectorService,
                           ResumeRepository resumeRepository) {

        this.vectorService = vectorService;
        this.resumeRepository = resumeRepository;
    }

    public List<CandidateMatch> matchCandidates(String jobDescription){

        float[] jobVector =
                vectorService.createEmbedding(jobDescription);

        List<Object[]> results =
                resumeRepository.searchWithScore(jobVector);

        return results.stream().map(r -> {

            CandidateMatch c = new CandidateMatch();

            c.setId(((Number) r[0]).longValue());
            c.setName((String) r[1]);
            c.setResumePreview(((String) r[2]).substring(0,100));
            c.setScore((Double) r[3]);

            return c;

        }).toList();
    }
}
