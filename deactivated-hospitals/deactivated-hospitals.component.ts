import { Component, OnInit } from '@angular/core';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';
import { ConnectionService } from '../services/database/connection.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivateFacilityComponent } from '../activate-facility/activate-facility.component';

@Component({
  selector: 'app-deactivated-hospitals',
  templateUrl: './deactivated-hospitals.component.html',
  styleUrls: ['./deactivated-hospitals.component.scss']
})
export class DeactivatedHospitalsComponent implements OnInit {
  hospitals: Array<HospitalRepresentation> = [];
  facility: HospitalRepresentation = {};
  current_role=sessionStorage.getItem('role');

  

  paginatedHospitals: Array<HospitalRepresentation[]> = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private service: ConnectionService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getAllHospitals()
      .subscribe({
        next: (result) => {
          this.hospitals = result;
          this.paginateHospitals();
        }
      });
  }





  onFacilityClicked(selectedFacility: HospitalRepresentation) {
    this.facility = selectedFacility;

    // Check if the status is not already "Active"
    if (this.facility.facility_Status !== "Active") {
      this.facility.facility_Status = "Active";
      console.log(this.facility);
      

      this.updateFacility();
    }
  }

  updateFacility() {
    if (this.facility.facility_Id !== undefined) {

      const isStatusChanged = this.facility.facility_Status === "Active";

      if (isStatusChanged) {
        this.service.updateHospital(this.facility.facility_Id, this.facility)
          .subscribe({
            next: (result) => {
              console.log('Facility updated successfully:', result);


            },
            error: (err) => {
              console.error('Facility update failed:', err);
            }
          });
      } else {
        console.log('Facility status is already "Active". No need to update.');
      }
    } else {
      console.error('Facility update failed: facility_Id is undefined');
    }
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

  openActivateDialog(facilityId: string | undefined): void {
    const facility_Id: string | undefined = facilityId?.toString();
    if (facility_Id) {
        const dialogRef = this.dialog.open(ActivateFacilityComponent, {
            data: { facility_Id: facility_Id } 
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Update the facility status here
                const updatedFacility: HospitalRepresentation = { facility_Status: 'Active' };

                this.service.updateHospital(facility_Id, updatedFacility).subscribe({
                    next: (result) => {
                        console.log('Facility status updated successfully:', result);
                        // You can reload the data here if needed, but it might not be necessary
                    },
                    error: (err) => {
                        console.error('Facility status update failed:', err);
                    }
                });
            }
        });
    } else {
        console.error('Facility ID is undefined or invalid.');
    }
}

  

}
