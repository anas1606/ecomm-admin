import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isVisible : boolean = true;
  constructor(private router:Router , 
    private http: HttpClient , 
    private tokenservice: TokenserviceService) { }

  login(email: string , pswd : string){
    const headers = {'Content-Type': 'application/json'};
    const body = { emailId: email , password : pswd };
    this.http.post<any>('http://localhost:8080/api/admin/login', body, { headers }).subscribe(data =>{
      if(data.statusCode == 200){
        // Store the Token to Local Storage
        this.tokenservice.storeToken(data.data.session_token);
        this.tokenservice.storeName(data.data.username);

        this.router.navigate(["/customer"]);
        this.isVisible = true;
        alert(data.message);
      }else{
        alert(data.message);
      }
    });
  }

}
