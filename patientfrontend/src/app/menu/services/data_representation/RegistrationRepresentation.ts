import { HospitalRepresentation } from "./HospitalRepresentation";
import { PatientRepresentation } from "./PatientRepresentation";
import { UserRepresentation } from "./UserRepresentation";

export interface RegistrationRepresentation{
    registration_Id?: String;
    registration_Date?:Date;
    status?:String;
    system_Patient?:String;
    registration_Type?:string;
    user_details?:UserRepresentation[];
    system_Facility?:String;
    facility_Details?:HospitalRepresentation[];
    approval_status?:boolean;
}