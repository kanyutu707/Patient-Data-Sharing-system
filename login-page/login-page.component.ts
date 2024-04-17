import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../services/database/connection.service';
import { UserRepresentation } from '../services/data_representation/UserRepresentation';
//import { AppService } from '../services/AppService';
import { HttpClient } from '@angular/common/http';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private service: ConnectionService, private router: Router) {}
  facilityIdOptions:String[]=[];
  facilities: Array<HospitalRepresentation> = [];
  email: string = '';
  password: string = '';

  onSubmitLogin(): void {
    const payload: any = {
      email: this.email,
      password: this.password,
    };
    this.service
      .login(payload)

      .subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            if (data.status === 200) {
              if (data.body) {
                this.service.setAuthToken(data.body.token);
                sessionStorage.setItem('email', data.body.email);
                sessionStorage.setItem('token', data.body.token);
                sessionStorage.setItem('role', data.body.role);

                if (data.body.role === 'Admin') {
                  this.router.navigate(['admin']);
                } else if (
                  data.body.role === 'Medical_Officer' ||
                  data.body.role === 'Medical_Admin'
                ) {
                  this.service.getAllHospitals().subscribe({
                    next: (result) => {
                      this.facilities=result;
                      this.facilities.forEach(facility => {
                        if(facility.facility_Name===data.body.facility_of_choice)
                        var facility_Id=facility.facility_Id;
                        console.log(facility_Id);
                        if(facility_Id){
                        sessionStorage.setItem('facility_Id',facility_Id.toString())
                        }
                        
                      });
                    }
                  });
                  this.router.navigate(['Dashboard']);
                  sessionStorage.setItem('user_facility', data.body.facility_of_choice)
                  
                } else {
                  alert('Please try logging in with the mobile application');
                }
                //this.router.dispose();
              }
            }
          } else {
            console.log('No data');
          }
        },
      });
  }
}
