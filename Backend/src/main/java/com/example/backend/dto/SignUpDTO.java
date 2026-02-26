package com.example.backend.dto;



public record SignUpDTO(
        String userGender,
        String userDOB,
        String password,
        String email,
        String firstName,
        String lastName,

        String facilityOfChoice,
        String role

) {
}
