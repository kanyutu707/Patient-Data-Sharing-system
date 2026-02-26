import { Component, Input } from '@angular/core';
import { UserRepresentation } from '../services/data_representation/UserRepresentation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input()
  user:UserRepresentation={};
}
