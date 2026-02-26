import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HospitalRepresentation } from '../services/data_representation/HospitalRepresentation';
import { ConnectionService } from '../services/database/connection.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent {
  @Input()
  hospital_rep: HospitalRepresentation = {}

  constructor(
    private service:ConnectionService
  ){

  }

  @Output()
  facilityIdClicked: EventEmitter<HospitalRepresentation> = new EventEmitter<HospitalRepresentation>();

  @Output()
  facilityChanger: EventEmitter<HospitalRepresentation> = new EventEmitter<HospitalRepresentation>();


  onClick() {
    const selectedFacility = {
      facility_Id: this.hospital_rep.facility_Id,
      facility_Name: this.hospital_rep.facility_Name,
      facility_Longitude: this.hospital_rep.facility_Longitude,
      facility_Latitude: this.hospital_rep.facility_Latitude,
      status:this.hospital_rep.facility_Status
    };

    this.facilityIdClicked.emit(selectedFacility);
  }

 
}
