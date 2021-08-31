import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(private http: HttpClient,
    private tokenService: TokenserviceService) { }

  hobbyList() {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/hobby', { headers });
  }

  updateStatus(body: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/hobby', body, { headers });
  }

  addHobby(name: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/hobby/' + name,{}, { headers });
  }
}
