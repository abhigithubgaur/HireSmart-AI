package com.hiresmart.repository;

import com.hiresmart.model.Resume;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    @Query(value = """
        SELECT *
        FROM resumes
        ORDER BY embedding <-> :vector
        LIMIT 10
        """, nativeQuery = true)
    List<Resume> searchSimilar(@Param("vector") float[] vector);

    @Query(value = """
        SELECT id, name, content,
       
        1 - (embedding <=> CAST(:vector AS vector)) AS score
        FROM resume
        ORDER BY embedding <-> CAST(:vector AS vector)
        LIMIT 10
        """, nativeQuery = true)
    List<Object[]> searchWithScore(@Param("vector") float[] vector);

    long count();
}