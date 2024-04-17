package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String user_Id;
    private String user_Gender;
    private String user_DOB;
    private String password;
    private String email;
    private String first_Name;
    private String last_Name;
    private String role;
    private String token;
    private String facility_of_choice;
}
