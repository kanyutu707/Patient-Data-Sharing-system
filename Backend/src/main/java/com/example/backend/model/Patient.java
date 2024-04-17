/*package com.example.backend.model;

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
public class Patient {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String patient_Id;
    private String System_Patient;


    @OneToMany(targetEntity = System_User.class, cascade = CascadeType.ALL)
    @JoinColumn(name="user_Id", referencedColumnName = "System_Patient")
    private List<System_User> sys_user;


    private String Facility_Of_Choice;

    @OneToMany(targetEntity = Facility.class, cascade = CascadeType.ALL)
    @JoinColumn(name="facility_Id", referencedColumnName = "Facility_Of_Choice")
    private List<Facility> Default_Facility_Details;
}*/