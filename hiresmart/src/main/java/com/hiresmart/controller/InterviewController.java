package com.hiresmart.controller;

import com.hiresmart.service.InterviewService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/questions")
    public String getQuestions(@RequestParam String role) {
        return interviewService.generateQuestions(role);
    }

    @PostMapping("/evaluate")
    public String evaluate(
            @RequestParam String question,
            @RequestParam String answer) {

        return interviewService.evaluateAnswer(question, answer);
    }
}