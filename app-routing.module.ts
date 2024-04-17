import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InpatientsComponent } from './inpatients/inpatients.component';
import { OutpatientsComponent } from './outpatients/outpatients.component';
import { AccountComponent } from './account/account.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DeactivatedHospitalsComponent } from './deactivated-hospitals/deactivated-hospitals.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminSubContainerComponent } from './admin-sub-container/admin-sub-container.component';
import { AdminSubMenuComponent } from './admin-sub-menu/admin-sub-menu.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { FacilityViewComponent } from './facility-view/facility-view.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientRegistrationFormComponent } from './patient-registration-form/patient-registration-form.component';
import { MenuComponent } from './menu/menu.component';
import { MedicalOfficersAdderComponent } from './medical-officers-adder/medical-officers-adder.component';

const routes: Routes = [
  
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path:'officers',
    component:MedicalOfficersAdderComponent
  },
  {
    path:'menu',
    component:MenuComponent
  },
  {
    path:'view',
    component:PatientViewComponent
  },
  {
    path:'patientRegister',
    component:PatientRegistrationFormComponent  
  },
  {
    path:'Facility',
    component:FacilityViewComponent
  },
  {
    path:'admin',
    component:HospitalsComponent
  }
  ,
  {
    path: 'Login',
    component: LoginPageComponent
  },
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: 'registerPatient',
    component: PatientRegistrationFormComponent
  },
  {
    path: 'Inpatient',
    component: InpatientsComponent
  },
  {
    path: 'Outpatient',
    component: OutpatientsComponent
  },
  {
    path: "Account",
    component: AccountComponent
  },
  {
    path: "admin/hospitals",
    component: HospitalsComponent
  },
  {
    path: "admin/Deactivated",
    component: DeactivatedHospitalsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
