import { PatientRepresentation } from "./PatientRepresentation";
import { RegistrationRepresentation } from "./RegistrationRepresentation";

export interface DiagnosisRepresentation {
    diagnosis_Id?: String;
    diagnosis_Name?: String;
    treatment?: String;
    symptoms?:String;
    patient_Registration?:String;
    registration_Details?:RegistrationRepresentation[];
    patient_Details?:PatientRepresentation[];
    

}