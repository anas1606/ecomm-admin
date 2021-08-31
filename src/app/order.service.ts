import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private tokenService:TokenserviceService,
    private http:HttpClient,
    ) { }

  orderList (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/order/list', data, { headers });
  }

  updateStatus (body:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/order', body, { headers });
  }

  orderDetail(){
    const id = this.tokenService.getUserId();
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/order/'+id, { headers });
  }

  delete (id:string){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.delete<any>('http://localhost:8080/api/admin/order/'+id, { headers });
  }
}
