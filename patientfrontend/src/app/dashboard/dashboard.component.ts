import { Component } from '@angular/core';
import { ConnectionService } from '../services/database/connection.service';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { RegistrationRepresentation } from '../services/data_representation/RegistrationRepresentation';
//import { AppService } from '../services/AppService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  registration: Array<RegistrationRepresentation> = [];

  public chart: any;

  patients={};

  userEmail:any=sessionStorage.getItem('email');
  current_role=sessionStorage.getItem('role');

  

  constructor(
    private service: ConnectionService,
    private router: Router,
   // private app:AppService,
    private http:HttpClient
  ) {
    http.get("patients").subscribe(data=>this.patients=data);
  }
  
 // authenticated(){ return this.app.authenticated;};


  moveToEmergency() {
    this.router.navigate(['/Emergency']);
  }

  current_Facility=sessionStorage.getItem('facility_Id');

  totalPatients: number = 0;
  totalInpatients: number = 0;
  totalOutpatients: number = 0;
  totalEmergencies: number = 0;
  InpatientPercentage: number = 0;
  OutpatientPercentage: number = 0;
  EmergencyPercentage: number = 0;
  ngOnInit(): void {
    console.log(this.userEmail);
    this.service.getAllRegistration()
      .subscribe({
        next: (result) => {
          this.registration = result;
          console.log(this.registration)
          this.totalPatients = 0;
          this.totalInpatients = 0;
          this.totalOutpatients = 0;
          this.totalEmergencies = 0;
          this.OutpatientPercentage = 0;
          this.EmergencyPercentage = 0;
          this.InpatientPercentage = 0; this.InpatientPercentage = this.totalInpatients / (this.totalInpatients);



          this.registration.forEach((registered) => {
            if (registered.user_details && Array.isArray(registered.user_details)) {
              this.totalPatients += registered.user_details.length;
            }
          });

          this.registration.forEach((registered) => {
            if (registered.user_details&& Array.isArray(registered.user_details) && registered.status === 'Inpatient') {
              this.totalInpatients += registered.user_details.length;
            }
          });
          this.registration.forEach((registered) => {
            if (registered.user_details && Array.isArray(registered.user_details) && registered.status === 'Outpatient') {
              this.totalOutpatients += registered.user_details.length;
            }
          });
          this.registration.forEach((registered) => {
            if (registered.user_details && Array.isArray(registered.user_details) && registered.registration_Type === 'Remote') {
              this.totalEmergencies += registered.user_details.length;
            }
          });

          this.InpatientPercentage = this.totalInpatients * 100 / (this.totalPatients);
          this.OutpatientPercentage = this.totalOutpatients * 100 / (this.totalPatients);
          this.EmergencyPercentage = this.totalEmergencies * 100 / (this.totalPatients);
          this.createChart();

        }
      });

  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['Inpatients', 'Outpatients'],
        datasets: [{
          label: 'PATIENT',
          data: [this.InpatientPercentage, this.OutpatientPercentage],
          backgroundColor: [
            'blue',
            'orange',
          
          ],
        
        }],
      },
      options: {
        aspectRatio: 3,
      }
    })
  }

}
