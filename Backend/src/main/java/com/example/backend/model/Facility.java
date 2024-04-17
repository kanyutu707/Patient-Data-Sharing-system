package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Facility {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String Facility_Id;

    private String Facility_Name;


    private double Facility_Latitude;

    private double Facility_Longitude;

    private String Facility_Status;

    /*private String Facility_User;


    @OneToMany(targetEntity = System_User.class, cascade = CascadeType.ALL)
    @JoinColumn(name="user_Id", referencedColumnName = "facility_User")
    private List<System_User> users;*/
}
