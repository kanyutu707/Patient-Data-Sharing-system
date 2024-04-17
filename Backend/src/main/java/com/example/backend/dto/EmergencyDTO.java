package com.example.backend.dto;

import java.util.Date;

public record EmergencyDTO (
    String Registration_Id,

    Date Registration_Date,

    String Status,

    String Registration_Type,

    String System_Facility,

    String Register_User,

    boolean approval_status
){

}
