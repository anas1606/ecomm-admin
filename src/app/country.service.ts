import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient,
    private tokenService: TokenserviceService) { }

  countryList() {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/country', { headers });
  }

  updateStatus(body: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/country', body, { headers });
  }

  addCountry(name: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/country/' + name, {} , { headers });
  }

}
