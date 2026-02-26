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
    private String userGender;
    private String userDOB;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String facilityOfChoice;


}
