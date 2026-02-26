import { Component, Input, OnInit } from '@angular/core';
import { DiagnosisRepresentation } from '../services/data_representation/DiagnosisRepresentation';
import { ConnectionService } from '../services/database/connection.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisFormComponent } from '../diagnosis-form/diagnosis-form.component';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  @Input() userId: string | undefined;
  diagnosis: DiagnosisRepresentation[] = [];
  registrationId: string | undefined;

  constructor(
    private service: ConnectionService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('PatientComponent initialized');

    this.userId = this.route.snapshot.queryParams['userId'];

    if (this.userId) {
      console.log('Patient ID:', this.userId);

      // Fetch diagnosis data for the specified patient ID
      this.service.getAllDiagnosis()
        .subscribe((result: any) => {
          // Extract relevant data from the main JSON
          this.diagnosis = result.map((item: any) => {
            return {
              diagnosis_Id: item.diagnosis_Id,
              diagnosis_Name: item.diagnosis_Name,
              treatment: item.treatment,
              symptoms: item.symptoms,
              patient_Registration: item.patient_Registration,
              registration_Details: item.registration_Details.map((reg: any) => {
                return {
                  status: reg.status,
                  registration_Type: reg.registration_Type,
                  registration_Date: reg.registration_Date,
                  facility_Details: reg.facility_Details.map((facility: any) => {
                    return {
                     
                      facility_Location: facility.facility_Location,
                      facility_Name: facility.facility_Name,
                      facility_Status: facility.facility_Status,
                      facility_Id: facility.facility_Id
                    };
                  }),
                  system_Patient: reg.system_Patient,
                  system_Facility: reg.system_Facility,
                  registration_Id: reg.registration_Id,
                  user_details: reg.user_details.map((patDet: any) => {
                    return {
                      
                          role: patDet.role,
                          user_Name:patDet.user_Name,
                          user_DOB: patDet.user_DOB,
                          user_Id: patDet.user_Id,
                          user_Gender: patDet.user_Gender,
                          facility_of_choice:patDet.facility_of_choice
                    
                    };
                  })
                  
                };
              })
            };
          });
          console.log(this.diagnosis);

          // Accessing properties safely
          if (this.diagnosis.length > 0) {
            const diagnosisEntry = this.diagnosis[0];
            if (diagnosisEntry.registration_Details && diagnosisEntry.registration_Details.length > 0) {
              const lastRegistration = diagnosisEntry.registration_Details[diagnosisEntry.registration_Details.length - 1]; // Get the last registration
              if (lastRegistration.user_details && lastRegistration.user_details.length > 0) {
                const patientDetails = lastRegistration.user_details[0];
                if (patientDetails.user_Id === this.userId) {
                  // Your logic here
                  if (lastRegistration.registration_Id) {
                    this.registrationId = lastRegistration.registration_Id.toString(); // Convert to primitive string
                    console.log('Registration ID:', this.registrationId);
                  }
                }
              }
            }
          } else {
            console.log('Diagnosis array is empty');
          }
        },
        error => {
          console.error('Error fetching diagnosis data:', error);
        });
    } else {
      console.log('No patient ID received');
    }
  }

  openDialog(userId: string): void {
    const dialogRef = this.dialog.open(DiagnosisFormComponent, {
      data: { userId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  
}
