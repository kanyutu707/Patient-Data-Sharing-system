package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "\"system_user\"")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class System_User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "user_id")
    private String userId;

    @Column(name = "password")
    private String password;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "userdob")
    private String userDOB;

    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "role")
    private String role;

    @Column(name = "facility_of_choice")
    private String facilityOfChoice;

    public String getUser_Id() {
        return userId;
    }

    public void setUser_Id(String userId) {
        this.userId = userId;
    }
}