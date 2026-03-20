package com.hiresmart.service;

import com.hiresmart.dto.DashboardStats;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.repository.ResumeRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;

    public DashboardService(ResumeRepository resumeRepository,
                            JobRepository jobRepository) {
        this.resumeRepository = resumeRepository;
        this.jobRepository = jobRepository;
    }

    public DashboardStats getStats(){

        DashboardStats stats = new DashboardStats();

        stats.setTotalResumes(resumeRepository.count());
        stats.setTotalJobs(jobRepository.count());

        return stats;
    }
}
