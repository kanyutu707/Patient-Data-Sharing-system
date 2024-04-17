package com.example.backend.dto;


public record SignUpDTO(
        String user_Gender,
        String user_DOB,
        char[] password,
        String email,
        String first_Name,
        String last_Name,

        String facility_of_choice,
        String role

) {
}
