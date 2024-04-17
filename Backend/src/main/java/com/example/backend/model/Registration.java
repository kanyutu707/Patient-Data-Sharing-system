package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Registration {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy="org.hibernate.id.UUIDGenerator")
    private String Registration_Id;

    private Date Registration_Date;

    private String Status;

    private String Registration_Type;

    private String System_Facility;

    private String Register_User;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean approval_status;



    @OneToMany(targetEntity = System_User.class, cascade = CascadeType.ALL)
    @JoinColumn(name="user_Id", referencedColumnName = "Register_User")
    private List<System_User> user_details;



    @OneToMany(targetEntity = Facility.class, cascade = CascadeType.ALL)
    @JoinColumn(name="facility_Id", referencedColumnName = "System_Facility")
    private List<Facility> Facility_Details;
}
