import { Component, OnInit } from '@angular/core';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';
import { ConnectionService } from '../services/database/connection.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UserRepresentation } from '../services/data_representation/UserRepresentation';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {
  hospitals: Array<HospitalRepresentation> = [];
  facility: HospitalRepresentation = {};
  user:UserRepresentation={};

  current_role=sessionStorage.getItem('role');
  
  paginatedHospitals: Array<HospitalRepresentation[]> = [];
  currentPage: number = 0;
  pageSize: number = 10;

  facilities=[
    {
      status:'Inactive',
    }
  ];
  statusControl=new FormControl();
  filteredStatusOptions: Observable<string[]>;


  lati:String='';
  longi:String='';


  constructor(
    private service: ConnectionService
    ) {
    this.filteredStatusOptions=this.statusControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filterStatus(value))
    );

    this.getCurrentLocation().then(resp=>{
      console.log(resp.lng);
      this.longi=resp.lng;
      console.log(resp.lat);
      this.lati=resp.lat;
     
    });


    
   }


  
  

   

   private _filterStatus(value: string):string[]{
    const filterValue = value.toLowerCase();
    return this.facilities
      .map(facility => facility.status)
      .filter(status => status.toLowerCase().includes(filterValue))
      .filter((value, index, self) => self.indexOf(value) === index);
   }

  ngOnInit(): void {
 
    this.service.getAllHospitals()
      .subscribe({
        next: (result) => {
          this.hospitals = result;
          
          this.paginateHospitals();
        }
      });

  }
  saveFacility() {
    if (this.facility.facility_Id) {
      
      this.updateFacility();
    } else {
      
      this.createNewFaciity();
    }

  }

  

  createNewFaciity(){
    const payload:any={
      facility_Latitude:this.lati,
      facility_Longitude:this.longi,
      facility_Name:this.facility.facility_Name,
      facility_Status:"Active"
      

      }
    this.service.createFacility(payload)
      .subscribe({
        next: (result) => {
          window.location.href = window.location.href;
          console.log(result.facility_Id);
        }
    
      })

    
  }

  getCurrentLocation():Promise<any>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
           resolve({lng:resp.coords.longitude, lat:resp.coords.latitude}); 
           reject("Coordinates not found");
      })

    })
  }

  createAdmin(){
    const payload:any={
      first_Name:this.user.first_Name,
      last_Name:this.user.last_Name,
      email:this.user.email,
      password:this.user.password,
      role:"Medical_Admin",
      user_DOB:this.user.user_DOB,
      user_Gender:this.user.user_Gender,
      facility_of_choice:this.facility.facility_Name

  

    }
    this.service.createUser(payload)
      .subscribe({
        next:(result)=>{
          window.location.href = window.location.href;
        
        }
      })
  }

 
  updateFacility() {
    
    if (this.facility.facility_Id !== undefined) {
      
      this.service.updateHospital(this.facility.facility_Id, this.facility)
        .subscribe({
          next: (result) => {
            this.facility.facility_Status="Inactive";
            console.log('Facility updated successfully:', result);
            
            window.location.href = window.location.href;
          },
          error: (err) => {
            console.error('Facility update failed:', err);
          }
        });
    } else {
      console.error('Facility update failed: facility_Id is undefined');
    }
  }
  

  onFacilityClicked(selectedFacility: HospitalRepresentation) {
    this.facility = selectedFacility;
  }




  paginateHospitals() {
    this.paginatedHospitals = [];
    for (let i = 0; i < this.hospitals.length; i += this.pageSize) {
      this.paginatedHospitals.push(this.hospitals.slice(i, i + this.pageSize));
    }

  }
  changePage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber < this.paginatedHospitals.length) {
      this.currentPage = pageNumber;
    }
  }

  
 totalFunction(){
 
  this.saveFacility();
  this.createAdmin();

 // this.createAdmin();
 }



 

}
