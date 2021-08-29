import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor() { }

  storeToken(token: string){
    localStorage.setItem("token","Bearer "+token);
  }

  storeName(name: string){
    localStorage.setItem("name",name);
  }

  getToken(): any{
    return localStorage.getItem("token");
  }

  getName(): any{
    return localStorage.getItem("name");
  }

  setUserID(id:string){
    localStorage.setItem("userId",id);
  }

  getUserId(): any{
    return localStorage.getItem("userId");
  }

  setVendorID(id:string){
    localStorage.setItem("vendorId",id);
  }

  getVendorId(): any{
    return localStorage.getItem("vendorId");
  }

  deleteToken(){
    localStorage.removeItem("token")
  }

  deleteName(){
    localStorage.removeItem("name")
  }

}
