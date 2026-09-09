package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {

    @JsonProperty("user_gender")
    private String userGender;

    @JsonProperty("userdob")
    private String userDOB;

    private String password;
    
    private String email;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("facility_of_choice")
    private String facilityOfChoice;

    private String role;
}