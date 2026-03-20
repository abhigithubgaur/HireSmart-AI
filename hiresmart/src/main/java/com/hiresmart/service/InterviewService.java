package com.hiresmart.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    private final ChatClient chatClient;

    public InterviewService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    // Generate interview questions
    public String generateQuestions(String role) {

        String prompt = """
        You are a technical interviewer.

        Generate 5 interview questions for the role:

        %s

        Include:
        - 3 technical questions
        - 1 problem solving question
        - 1 behavioral question
        """.formatted(role);

        return chatClient.prompt(prompt)
                .call()
                .content();
    }

    // Evaluate candidate answer
    public String evaluateAnswer(String question, String answer) {

        String prompt = """
        Evaluate the candidate answer.

        Question:
        %s

        Answer:
        %s

        Give:
        - Score out of 10
        - Feedback
        - Improvement tips
        """.formatted(question, answer);

        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}