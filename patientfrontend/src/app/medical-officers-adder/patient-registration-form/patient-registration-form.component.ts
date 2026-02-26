import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisFormComponent } from '../diagnosis-form/diagnosis-form.component';
import { ConnectionService } from '../services/database/connection.service';
import { PatientRepresentation } from '../services/data_representation/PatientRepresentation';
import { RegistrationRepresentation } from '../services/data_representation/RegistrationRepresentation';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';
import { UserRepresentation } from '../services/data_representation/UserRepresentation';
//import { AppService } from '../services/AppService';

@Component({
  selector: 'app-patient-registration-form',
  templateUrl: './patient-registration-form.component.html',
  styleUrls: ['./patient-registration-form.component.scss']
})
export class PatientRegistrationFormComponent {
  patients: Array<UserRepresentation> = [];
  facility: Array<HospitalRepresentation> = [];
  register:RegistrationRepresentation={};
  patientOptions:String[]=[];
  facilityOptions:String[]=[];
  current_facility=sessionStorage.getItem('user_facility');
  

  current_role=sessionStorage.getItem('role');
  statuses:String[]=[];
  statusOptions:any=[
    {
      "status_name":"Inpatient"
    },
    {
      "status_name":"Outpatient"
    }
  ]
  constructor(
    private service:ConnectionService,
   // private app:AppService
  ){
    console.log(" The facility Id is"+sessionStorage.getItem('facility_Id'));
  }
  //authenticated(){ return this.app.authenticated;};
  ngOnInit(): void {
    this.service.getAllUsers()
      .subscribe({
        next: (result) => {
          this.patients = result;
          
          if(this.patients){
            for (let index = 0; index < this.patients.length; index++) {
              const patient = this.patients[index];
              if(patient.role==="Patient"){
        
                  const user = patient.user_Id;
                
                if(user){
                  this.patientOptions.push(user);
                }
                  
                  console.log(user);
                  
                
              }
              
            }

          }
          if(this.statusOptions){
            for (let index = 0; index < this.statusOptions.length; index++) {
              const element = this.statusOptions[index];
              this.statuses.push(element.status_name);
            }
          }
          
        }
      });
      this.service.getAllHospitals()
      .subscribe({
        next: (result) => {
          this.facility = result;
          
          if(this.facility){
            for (let index = 0; index < this.facility.length; index++) {
              const facilities = this.facility[index];
              if(facilities.facility_Id){
              this.facilityOptions.push(facilities.facility_Id);
                  
                  
                }
                
            }
          }
        }
      }
    );
    
    }
    store_facility:any=sessionStorage.getItem('facility_Id');
      
  savePatient(){
    if (!this.register){
      return;
    }
    const payload:any={
      "registration":{
        registration_Date:new Date(),
        status:this.register.status,
        registration_Type:"Physical",
        register_User:this.register.system_Patient,
        system_Facility:this.store_facility

        
      }
    }
    this.service.RegisterPatient(payload)
      .subscribe({
        next:(result)=>{
        //  window.location.href=window.location.href;
          console.log(sessionStorage.getItem('facility_Id'));
          console.log(this.current_facility);
          window.location.href = window.location.href;
        }
      })
  }
  
}

