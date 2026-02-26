import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospitalRepresentation } from '../data_representation/HospitalRepresentation';
import { Observable, catchError } from 'rxjs';
import { PatientRepresentation } from '../data_representation/PatientRepresentation';
import { DiagnosisRepresentation } from '../data_representation/DiagnosisRepresentation';
import { UserRepresentation } from '../data_representation/UserRepresentation';
import { RegistrationRepresentation } from '../data_representation/RegistrationRepresentation';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private baseUrl = 'http://localhost:8080/';
  private token=sessionStorage.getItem('token');



  constructor(
    private http: HttpClient
  ) { 
   
  }


createUser(user:any){
  const userUrl = `${this.baseUrl}backend/register`;
  const headers=new HttpHeaders({
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+this.token,
  })

return this.http.post<any>(userUrl, user, {headers});
}


  getAllHospitals() {
    const hospitalUrl = `${this.baseUrl}backend/Get_All_Facilities`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    return this.http.get<Array<HospitalRepresentation>>(hospitalUrl, {headers});
  }
  createFacility(facility: HospitalRepresentation) {
    const facilityUrl = `${this.baseUrl}backend/create_facility`;
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    return this.http.post<HospitalRepresentation>(facilityUrl, facility, headers);
  }
  

  getHospital(facility_Id?: string): Observable<Array<HospitalRepresentation>> {
    const hospitalUrl = `${this.baseUrl}backend/Get_All_Facilities`;
    
    const headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+this.token,
    })
    const params = facility_Id ? new HttpParams().set('facilityId', facility_Id) : new HttpParams();

    return this.http.get<Array<HospitalRepresentation>>(hospitalUrl, { headers, params });
  }



  login(login: any){
    const loginUrl = `${this.baseUrl}backend/login`;
    return this.http.post<any>(loginUrl, login, {observe:'response'});
  }
  updateHospital(facility_Id?: String, updatedFacility?: HospitalRepresentation): Observable<any> {
    const headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+this.token,
    })
    const facilityUrl = `${this.baseUrl}backend/update_Facility/${facility_Id}`;
    return this.http.put(facilityUrl, updatedFacility, {headers});
  }
  getAllPatients() {
    const headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+this.token,
    })
    const patientUrl = `${this.baseUrl}backend/Get_All_Patients`;

    return this.http.get<Array<PatientRepresentation>>(patientUrl, {headers});
  }
  getAllDiagnosis(){
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const Diagnosis_Url = `${this.baseUrl}backend/Get_All_Diagnosis`;
    return this.http.get<Array<DiagnosisRepresentation>>(Diagnosis_Url, headers);
  }
  getAllUsers(){
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const User_Url = `${this.baseUrl}backend/Get_All_Users`;
    return this.http.get<Array<UserRepresentation>>(User_Url,headers);
  }
  getAllRegistration(){
   
    const Registration_Url=`${this.baseUrl}backend/Get_All_Registrations`;
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    return this.http.get<Array<RegistrationRepresentation>>(Registration_Url, headers);
  }
  RegisterPatient(register: RegistrationRepresentation){
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const registrationUrl = `${this.baseUrl}backend/create_Registration`;
    return this.http.post<RegistrationRepresentation>(registrationUrl, register, headers);
  }
  diagnosePatient(diagnosis: DiagnosisRepresentation){
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const diagnosisUrl = `${this.baseUrl}backend/create_Diagnosis`;
    return this.http.post<DiagnosisRepresentation>(diagnosisUrl, diagnosis, headers);
  }
  getDiagnosisByPatientId(patientId: string): Observable<DiagnosisRepresentation[]> {
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const diagnosisUrl = `${this.baseUrl}backend/Get_Diagnosis_By_PatientId/${patientId}`;
    return this.http.get<DiagnosisRepresentation[]>(diagnosisUrl, headers);
  }
  getSystemUser(){
    const header=new HttpHeaders().set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    const headers={headers:header};
    const User_Url = `${this.baseUrl}backend/user`;
    return this.http.get<Array<UserRepresentation>>(User_Url, headers);
  }

  getAuthToken():string|null{
    return window.localStorage.getItem("auth_token");
  }
  setAuthToken(token:string|null):void{
    if(token!==null){
      window.localStorage.setItem("auth_token", token);
    }else{
      window.localStorage.removeItem("auth_token");
    }
  }
  
  
  

}
