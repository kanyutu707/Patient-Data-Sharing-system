import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sub-menu',
  templateUrl: './admin-sub-menu.component.html',
  styleUrls: ['./admin-sub-menu.component.scss']
})
export class AdminSubMenuComponent {

  constructor(private router:Router){

  }

  active(){
    this.router.navigate(['/admin/'])
  }
  
  deactivated(){
    this.router.navigate(['/admin/Deactivated'])
  }


}
