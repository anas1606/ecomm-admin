import { Injectable } from '@angular/core';
import { TokenserviceService } from './tokenservice.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private tokenService:TokenserviceService,
    private http:HttpClient) { }

  vendorList (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/vendor/list', data, { headers });
  }

  productList (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/admin/vendor/product/list', data, { headers });
  }

  updateStatus (body:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/vendor', body, { headers });
  }

  updateProductStatus (body:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/admin/vendor/product', body, { headers });
  }

  vendorProfile(){
    const id = this.tokenService.getVendorId();
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/admin/vendor/'+id, { headers });
  }

}
