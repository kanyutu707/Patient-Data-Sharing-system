import { Component } from '@angular/core';
import { ConnectionService } from '../services/database/connection.service';
import { UserRepresentation } from '../services/data_representation/UserRepresentation';

@Component({
  selector: 'app-medical-officers-adder',
  templateUrl: './medical-officers-adder.component.html',
  styleUrls: ['./medical-officers-adder.component.scss']
})
export class MedicalOfficersAdderComponent {
  user:UserRepresentation={};
  check_role=sessionStorage.getItem("role");
  constructor(
    private service:ConnectionService
  ){
  
  }
  users_facility=sessionStorage.getItem('user_facility');

  createOfficer(){
    const payload:any={
      first_Name:this.user.first_Name,
      last_Name:this.user.last_Name,
      email:this.user.email,
      password:this.user.password,
      role:"Medical_Officer",
      user_DOB:this.user.user_DOB,
      user_Gender:this.user.user_Gender,
      facility_of_choice:this.users_facility

    }
    this.service.createUser(payload)
      .subscribe({
        next:(result)=>{
          window.location.href = window.location.href;
        }
      })
      
  }

}
