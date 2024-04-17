package com.example.backend.repository;

import com.example.backend.model.System_User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface User_Repo extends JpaRepository<System_User, String> {
    Optional<System_User> findByEmail(String Email);
}
