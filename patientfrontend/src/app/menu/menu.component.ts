import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { AppService } from '../services/AppService';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  current_role=sessionStorage.getItem('role');
  current_Facility=sessionStorage.getItem('user_facility');
  @Output() loginEvent=new EventEmitter();
  @Output() logoutEvent=new EventEmitter();

    constructor(
     // private app: AppService,
      private http: HttpClient, private router: Router
      
      ) {
     //   this.app.authenticate(undefined, undefined);
      }
     /* logout() {
        this.http.post('logout', {}).pipe(finalize(() => {
            this.app.authenticated = false;
            this.router.navigateByUrl('/login');
        })).subscribe();
      }*/
     // authenticated(){ return this.app.authenticated;};


  homeNavigate(){
    this.router.navigate(['Dashboard'])
   
  }
  emergencyNavigate(){
    this.router.navigate(['registerPatient'])
    
  }
  inpatientNavigate(){
    this.router.navigate(['Inpatient'])
    this.loginEvent.emit();
  }
  outpatientNavigate(){
    this.router.navigate(['Outpatient'])
    this.loginEvent.emit();
  }
  Account(){
    this.router.navigate(['Login'])
    sessionStorage.clear();
  }
 

}
