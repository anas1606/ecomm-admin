import { Injectable } from '@angular/core';
import { TokenserviceService } from './tokenservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private tokenService: TokenserviceService,
    private http: HttpClient,
    private router: Router,
  ) { }

  countryList() {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<any>('http://localhost:8080/api/admin/country', { headers });
  }

  updateStatus(body: any) {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<any>('http://localhost:8080/api/admin/country', body, { headers });
  }

  addCountry(name: any) {
    //const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>('http://localhost:8080/api/admin/country/' + name, { headers });
  }

}
