package com.hiresmart.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ResumeParserService {

    private final ChatClient chatClient;

    public ResumeParserService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String parseResume(String resumeText) {

        String prompt = """
        Extract structured information from this resume.

        Return in JSON format:

        {
          "name": "",
          "skills": [],
          "experience": [],
          "education": []
        }

        Resume:
        %s
        """.formatted(resumeText);

        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}