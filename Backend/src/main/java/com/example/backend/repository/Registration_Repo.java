package com.example.backend.repository;

import com.example.backend.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Registration_Repo extends JpaRepository<Registration, String> {
}
