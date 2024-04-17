import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activate-facility',
  templateUrl: './activate-facility.component.html',
  styleUrls: ['./activate-facility.component.scss']
})
export class ActivateFacilityComponent {
  constructor(private dialogRef: MatDialogRef<ActivateFacilityComponent>) {}

  closeDialog(activate: boolean): void {
    this.dialogRef.close(activate);
  }
}
