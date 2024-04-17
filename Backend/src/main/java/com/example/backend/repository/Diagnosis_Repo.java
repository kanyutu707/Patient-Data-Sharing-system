package com.example.backend.repository;

import com.example.backend.model.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Diagnosis_Repo extends JpaRepository<Diagnosis, String> {
}
