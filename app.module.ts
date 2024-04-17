import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { HospitalContainerComponent } from './hospital-container/hospital-container.component';
import { InpatientsComponent } from './inpatients/inpatients.component';
import { OutpatientsComponent } from './outpatients/outpatients.component';
import { AccountComponent } from './account/account.component';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { AdminSubMenuComponent } from './admin-sub-menu/admin-sub-menu.component';
import { AdminSubContainerComponent } from './admin-sub-container/admin-sub-container.component';
import { DeactivatedHospitalsComponent } from './deactivated-hospitals/deactivated-hospitals.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityViewComponent } from './facility-view/facility-view.component';
import { PatientComponent } from './patient/patient.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientRegistrationFormComponent } from './patient-registration-form/patient-registration-form.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { ActivateFacilityComponent } from './activate-facility/activate-facility.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { UserComponent } from './user/user.component';
//import { AppService } from './services/AppService';
//import {XhrInterceptor} from './services/XhrInterceptor';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { MedicalOfficersAdderComponent } from './medical-officers-adder/medical-officers-adder.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    MenuComponent,
    DashboardComponent,
  
    SearchBarComponent,
    AdminContainerComponent,
    AdminMenuComponent,
    HospitalContainerComponent,
    InpatientsComponent,
    OutpatientsComponent,
    AccountComponent,
    HospitalComponent,
    HospitalsComponent,
    AdminSubMenuComponent,
    AdminSubContainerComponent,
    DeactivatedHospitalsComponent,
     FacilityViewComponent,
     PatientComponent,
     DiagnosisFormComponent,
     PatientRegistrationFormComponent,
     PatientViewComponent,
     ActivateFacilityComponent,
     UserComponent,
     AuthContentComponent,
     MedicalOfficersAdderComponent,
     
   
     
   
   

  ],
  imports: [
    MatAutocompleteModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    
    
    
  ],
  //providers: [AppService, {provide: HTTP_INTERCEPTORS, useClass:XhrInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
