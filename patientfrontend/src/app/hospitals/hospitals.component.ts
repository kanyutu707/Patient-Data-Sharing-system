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
  user: UserRepresentation = {};

  current_role = sessionStorage.getItem('role');
  
  paginatedHospitals: Array<HospitalRepresentation[]> = [];
  currentPage: number = 0;
  pageSize: number = 10;

  facilities = [
    { status: 'Inactive' },
    { status: 'Active' }
  ];
  
  statusControl = new FormControl();
  filteredStatusOptions: Observable<string[]>;

  lati: string = '';
  longi: string = '';

  constructor(private service: ConnectionService) {
    this.filteredStatusOptions = this.statusControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );

    this.getCurrentLocation().then(resp => {
      this.longi = resp.lng;
      this.lati = resp.lat;
    }).catch(err => {
      console.warn('Geolocation lookup notice:', err);
    });
  }

  private _filterStatus(value: string): string[] {
    const filterValue = (value || '').toLowerCase();
    return this.facilities
      .map(facility => facility.status)
      .filter(status => status.toLowerCase().includes(filterValue))
      .filter((val, index, self) => self.indexOf(val) === index);
  }

  ngOnInit(): void {
    this.service.getAllHospitals().subscribe({
      next: (result) => {
        this.hospitals = result || [];
        this.paginateHospitals();
      },
      error: (err) => {
        console.error('Failed to retrieve hospitals:', err);
      }
    });
  }

  saveFacility() {
    if (this.facility.facility_Id) {
      this.updateFacility();
    } else {
      this.createNewFacility();
    }
  }

  createNewFacility() {
    const payload: any = {
      facility_Latitude: this.lati,
      facility_Longitude: this.longi,
      facility_Name: this.facility.facility_Name,
      facility_Status: "Active"
    };

    this.service.createFacility(payload).subscribe({
      next: (result) => {
        console.log('Facility created:', result?.facility_Id);
        window.location.reload();
      },
      error: (err) => {
        console.error('Facility creation failed:', err);
      }
    });
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by this browser');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        resp => resolve({ lng: resp.coords.longitude.toString(), lat: resp.coords.latitude.toString() }),
        err => reject(err)
      );
    });
  }

  createAdmin() {
    const payload: any = {
      first_Name: this.user.first_Name,
      last_Name: this.user.last_Name,
      email: this.user.email,
      password: this.user.password,
      role: "Medical_Admin",
      user_DOB: this.user.user_DOB,
      user_Gender: this.user.user_Gender,
      facility_of_choice: this.facility.facility_Name
    };

    this.service.createUser(payload).subscribe({
      next: (result) => {
        console.log('Admin user created successfully');
        window.location.reload();
      },
      error: (err) => {
        console.error('Admin user creation failed:', err);
      }
    });
  }

  updateFacility() {
    if (this.facility.facility_Id !== undefined) {
      this.service.updateHospital(this.facility.facility_Id, this.facility).subscribe({
        next: (result) => {
          console.log('Facility updated successfully:', result);
          window.location.reload();
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

  totalFunction() {
    this.saveFacility();
    if (this.user.email && this.user.password) {
      this.createAdmin();
    }
  }
}