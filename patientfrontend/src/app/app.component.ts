import { HttpClient } from '@angular/common/http';
import { Component,  ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
//import { AppService } from './services/AppService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router:Router,
  //  private app:AppService,
 
    ){
    
    }

  
  //authenticated(){ return this.app.authenticated;};

  title = 'Medical';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  homeNavigate(){
    this.router.navigate(['Dashboard'])
  }
  emergencyNavigate(){
    this.router.navigate(['registerPatient'])
  }
  inpatientNavigate(){
    this.router.navigate(['Inpatient'])
  }
  outpatientNavigate(){
    this.router.navigate(['Outpatient'])
  }
  Account(){
    this.router.navigate(['Account'])
  }

}
