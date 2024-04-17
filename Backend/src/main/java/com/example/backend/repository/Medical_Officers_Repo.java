package com.example.backend.repository;

import com.example.backend.model.Medical_Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface Medical_Officers_Repo extends JpaRepository<Medical_Officer, String> {


}
