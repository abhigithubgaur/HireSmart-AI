package com.hiresmart.service;

import org.springframework.ai.embedding.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VectorService {

    private final EmbeddingModel embeddingModel;

    public VectorService(EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
    }

    public float[] createEmbedding(String text) {

//        EmbeddingResponse response =
//                embeddingModel.embedForResponse(List.of(text));

        return embeddingModel.embed(text);
    }
}