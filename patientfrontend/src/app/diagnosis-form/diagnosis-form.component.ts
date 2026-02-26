import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisRepresentation } from '../services/data_representation/DiagnosisRepresentation';
import { ConnectionService } from '../services/database/connection.service';
import { each } from 'chart.js/dist/helpers/helpers.core';
import { RegistrationRepresentation } from '../services/data_representation/RegistrationRepresentation';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss']
})
export class DiagnosisFormComponent implements OnInit {
  diagnosis: DiagnosisRepresentation = {};
  diagnose: Array<DiagnosisRepresentation> = [];
  registration:Array<RegistrationRepresentation>=[];
  registrationId: string | null = null;
  userId: string | null = null;

  constructor(
    private service: ConnectionService,
    public dialogRef: MatDialogRef<DiagnosisFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.getAllDiagnosis()
    .subscribe({
      next: (result) => {
        this.diagnose = result;
        
     

   console.log(this.data.userId);
   this.userId=this.data.userId;
   
    }});

    this.service.getAllRegistration()
      .subscribe({
        next:(result)=>{
          this.registration=result;
              if(this.registration){
                for (let index = 0; index < this.registration.length; index++) {
                  const singleRegistration = this.registration[index];
                  console.log(singleRegistration);
                  if(singleRegistration.user_details){
                    for (let index = 0; index < singleRegistration.user_details.length; index++) {
                      const singlePatient = singleRegistration.user_details[index];
                            
                      if (singlePatient.user_Id===this.userId){
                        if(singleRegistration.registration_Id !==undefined){
                            this.registrationId=singleRegistration.registration_Id.toString();
                            console.log("The registration Id for the patient is"+singleRegistration.registration_Id);
                      }
                      else{
                        console.log("Registration Id is undefined for the patient");
                      }
                    }
                      else{
                        console.log("No match found");
                      }
                    }
                  }else{
                    console.log("No patient details found");
                  }
                }
              }else{
                console.log("No registration details found");
              }
            
            
        }
      })
    
  } 

  closeDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogRef.close();
  }
 saveDiagnosis() {
    if (!this.diagnosis || !this.registrationId) {
      return;
    }

    const payload: any = {
      "diagnosis": {
        diagnosis_Name: this.diagnosis.diagnosis_Name,
        treatment: this.diagnosis.treatment,
        symptoms: this.diagnosis.symptoms,
        patient_Registration: this.registrationId
      }
    };

    this.service.diagnosePatient(payload)
      .subscribe({
        next: (result) => {
          window.location.href = window.location.href;
        }
      });
  }

 
}
