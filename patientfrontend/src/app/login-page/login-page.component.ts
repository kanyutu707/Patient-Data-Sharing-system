import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../services/database/connection.service';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  facilityIdOptions: string[] = [];
  facilities: Array<HospitalRepresentation> = [];
  
  // Form field bindings
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private service: ConnectionService, private router: Router) {}

  onSubmitLogin(): void {
    const payload: any = {
      email: this.email,
      password: this.password,
    };

    this.service.login(payload).subscribe({
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
                    this.facilities = result;
                    this.facilities.forEach((facility) => {
                      if (facility.facility_Name === data.body.facility_of_choice) {
                        const facility_Id = facility.facility_Id;
                        console.log(facility_Id);
                        if (facility_Id) {
                          sessionStorage.setItem('facility_Id', facility_Id.toString());
                        }
                      }
                    });
                  },
                });
                
                if (data.body.facility_of_choice) {
                  sessionStorage.setItem('user_facility', data.body.facility_of_choice);
                }
                
                this.router.navigate(['Dashboard']);
              } else {
                alert('Please try logging in with the mobile application');
              }
            }
          }
        } else {
          console.log('No data received');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid email or password. Please try again.');
      }
    });
  }
}