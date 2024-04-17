import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationRepresentation } from '../services/data_representation/RegistrationRepresentation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{

  current_Facility=sessionStorage.getItem('facility_Id');
  
  @Input() registration_rep: RegistrationRepresentation | undefined;
  @Output() openDiagnosisForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  
    
  }

  ngOnInit() {
    
    console.log('Registration Representation:', this.registration_rep);
  }

  viewRecords(userId: string | undefined) {
    if (userId) {
      // Redirect to the diagnosis page with the patient ID as a parameter
      this.router.navigate(['/view'], { queryParams: { userId: userId } });
    } else {
      console.error('No patient ID received');
    }
  }
}  
