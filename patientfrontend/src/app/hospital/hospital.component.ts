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
  hospital_rep: HospitalRepresentation = {};

  @Output()
  facilityIdClicked: EventEmitter<HospitalRepresentation> = new EventEmitter<HospitalRepresentation>();

  @Output()
  facilityChanger: EventEmitter<HospitalRepresentation> = new EventEmitter<HospitalRepresentation>();

  constructor(private service: ConnectionService) {}

  onClick() {
    // Pass the complete hospital representation to the parent component
    this.facilityIdClicked.emit(this.hospital_rep);
  }
}