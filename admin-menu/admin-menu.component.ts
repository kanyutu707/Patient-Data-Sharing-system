import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

  constructor(
    private router:Router
  ){}

  current_role=sessionStorage.getItem('role');


  Account(){
    this.router.navigate(['Login'])
    sessionStorage.clear();
  }
 
}
