import { Injectable } from '@angular/core';
import { TokenserviceService } from './tokenservice.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private tokenService:TokenserviceService,
    private http:HttpClient,
    ) { }

  customerList (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/customer/list', data, { headers });
  }

  updateStatus (body:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/customer', body, { headers });
  }

  customerProfile(){
    const id = this.tokenService.getUserId();
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/customer/'+id, { headers });
  }

  delete (id:string){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.delete<any>('http://localhost:8080/api/admin/customer/'+id, { headers });
  }
}
