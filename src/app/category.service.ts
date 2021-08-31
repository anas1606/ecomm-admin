import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    private tokenService: TokenserviceService) { }

  categoryList() {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/category', { headers });
  }

  updateStatus(body: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/category', body, { headers });
  }

  addCategory(name: any) {
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/category/' + name,{}, { headers });
  }
}
