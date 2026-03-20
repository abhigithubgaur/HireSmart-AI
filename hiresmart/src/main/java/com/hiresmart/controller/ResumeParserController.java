package com.hiresmart.controller;

import com.hiresmart.service.ResumeParserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/parser")
public class ResumeParserController {

    private final ResumeParserService parserService;

    public ResumeParserController(ResumeParserService parserService) {
        this.parserService = parserService;
    }

    @PostMapping("/resume")
    public String parseResume(@RequestBody String resumeText) {

        return parserService.parseResume(resumeText);

    }
}
