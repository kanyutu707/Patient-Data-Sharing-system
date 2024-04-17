package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Diagnosis {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy="org.hibernate.id.UUIDGenerator")
    private String Diagnosis_id;
    @Column(nullable = false)
    private String Diagnosis_Name;
    private String treatment;
    private String symptoms;


    private String Patient_Registration;

    @OneToMany(targetEntity = Registration.class, cascade = CascadeType.ALL)
    @JoinColumn(name="registration_Id", referencedColumnName = "Patient_Registration")
    private List<Registration> Registration_Details;

    private  String details_facility;

    @OneToMany(targetEntity = Registration.class, cascade = CascadeType.ALL)
    @JoinColumn(name="facility_Id", referencedColumnName = "details_facility")
    private List<Facility> Facility_Details;

}
