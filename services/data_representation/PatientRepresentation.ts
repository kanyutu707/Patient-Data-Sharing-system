import { HospitalRepresentation } from "./HospitalRepresentation";
import { UserRepresentation } from "./UserRepresentation";

export interface PatientRepresentation {
    patient_Id?: String;
    system_Patient?:String;
    sys_user?: UserRepresentation[];
    facility_Of_Choice?:String;
    default_Facility_Details?: HospitalRepresentation

}