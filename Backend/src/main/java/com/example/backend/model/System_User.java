package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public  class System_User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")

    private String User_Id;
    private String password;
    private String User_Gender;
    private String User_DOB;
    private String email;
    private String First_Name;
    private String Last_Name;
    private String role;
    private String facility_of_choice;


}
