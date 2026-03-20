package com.hiresmart.service;

import com.hiresmart.model.Resume;
import com.hiresmart.repository.ResumeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final VectorService vectorService;
    private final ResumeRepository repo;

    public SearchService(VectorService vectorService,
                         ResumeRepository repo){
        this.vectorService = vectorService;
        this.repo = repo;
    }

    public List<Resume> search(String jobDescription){

        float[] vector =
                vectorService.createEmbedding(jobDescription);

        return repo.searchSimilar(vector);
    }
}
