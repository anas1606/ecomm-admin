import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  stateList() {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<any>('http://localhost:8080/api/admin/state', { headers });
  }

  updateStatus(body: any) {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<any>('http://localhost:8080/api/admin/state', body, { headers });
  }

  addState(data: any) {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>('http://localhost:8080/api/admin/state' , data, { headers });
  }
}
