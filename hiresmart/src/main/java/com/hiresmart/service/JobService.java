package com.hiresmart.service;

import com.hiresmart.model.Job;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.dto.JobRequest;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final VectorService vectorService;

    public JobService(JobRepository jobRepository,
                      VectorService vectorService) {

        this.jobRepository = jobRepository;
        this.vectorService = vectorService;
    }

    public Job createJob(JobRequest request) {

        // Generate AI embedding
        float[] embedding =
                vectorService.createEmbedding(request.getDescription());

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setEmbedding(embedding);

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJob(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}