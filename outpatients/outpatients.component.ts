import { Component } from '@angular/core';
import { ConnectionService } from '../services/database/connection.service';
import { RegistrationRepresentation } from '../services/data_representation/RegistrationRepresentation';
import { MatDialog } from '@angular/material/dialog';
import { DiagnosisFormComponent } from '../diagnosis-form/diagnosis-form.component';
//import { AppService } from '../services/AppService';

@Component({
  selector: 'app-outpatients',
  templateUrl: './outpatients.component.html',
  styleUrls: ['./outpatients.component.scss']
})
export class OutpatientsComponent {
  registrations: RegistrationRepresentation[] = [];
  current_role=sessionStorage.getItem('role');
  constructor(
    private service: ConnectionService,
    private dialog: MatDialog,
  //  private app:AppService
  ) { }
  //authenticated(){ return this.app.authenticated;};

  current_Facility=sessionStorage.getItem('facility_Id');

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getAllRegistration().subscribe({
      next: (result) => {
        this.registrations = result.filter(patient =>patient && patient.status === 'Outpatient');
      }
    });
  }

  

  showDiagnosisForm(diagnosisData: RegistrationRepresentation) {
    const patientDetails = diagnosisData.registration_Id;
    let registrationId: string = '';
    if (patientDetails) {
      registrationId = (registrationId || '').toString(); 
    }
  
    const dialogRef = this.dialog.open(DiagnosisFormComponent, {
      width: '600px',
      data: { registrationData: diagnosisData, registrationId } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
