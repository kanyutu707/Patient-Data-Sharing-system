/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRepresentation } from './data_representation/UserRepresentation';

@Injectable()
export class AppService {

  authenticated = false;
  configUrl="localhost:8080/backend/Get_All_Diagnosis"

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: { email: string; password: string; } | undefined, callback: { (): void; (): any; } | undefined) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});

        this.http.get<UserRepresentation>(this.configUrl, {headers: headers}).subscribe(response => {
            if (response['email']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

}*/