package com.hiresmart.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String skillGap(String resume, String jobDescription) {

        String prompt = """
        You are an expert career coach.

        Compare the candidate resume with the job description.

        Identify:
        1. Missing skills
        2. Skills to improve
        3. Learning suggestions

        Resume:
        %s

        Job Description:
        %s
        """.formatted(resume, jobDescription);

        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}