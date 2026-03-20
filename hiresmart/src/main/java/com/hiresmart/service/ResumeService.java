package com.hiresmart.service;

import com.hiresmart.model.Resume;
import com.hiresmart.repository.ResumeRepository;
import com.hiresmart.util.PdfParser;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    private final ResumeRepository repo;
    private final VectorService vectorService;

    public ResumeService(ResumeRepository repo,
                         VectorService vectorService) {
        this.repo = repo;
        this.vectorService = vectorService;
    }

    public Resume upload(MultipartFile file){

        String content = PdfParser.parse(file);

        float[] embedding =
                vectorService.createEmbedding(content);

        Resume resume = new Resume();
        resume.setName(file.getOriginalFilename());
        resume.setContent(content);
        resume.setEmbedding(embedding);

        return repo.save(resume);
    }
}
