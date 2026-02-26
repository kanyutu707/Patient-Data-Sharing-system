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
    private String userId;
    private String userGender;
    private String userDOB;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String token;
    private String facilityOfChoice;
}
