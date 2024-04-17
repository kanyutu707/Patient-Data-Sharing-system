package com.example.backend.dto;

import com.example.backend.model.Diagnosis;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Diagnosis_DTO {
    private Diagnosis diagnosis;
}
