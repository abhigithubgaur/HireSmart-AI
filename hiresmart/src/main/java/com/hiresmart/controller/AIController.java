package com.hiresmart.controller;

import com.hiresmart.service.AIService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/skill-gap")
    public String skillGap(
            @RequestParam String resume,
            @RequestParam String job) {

        return aiService.skillGap(resume, job);
    }
}