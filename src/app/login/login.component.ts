import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice:LoginService) { 
    this.loginservice.isVisible = false;
  }

  ngOnInit(): void {
    this.loginservice.isVisible = false;
  }

  onSignin(inputEmail:any , pswd:any){
    if(inputEmail != '' && pswd != ''){
      this.loginservice.login(inputEmail,pswd);
    }
    else{
      alert("Requierd Filed Missing")
    }
  }

}
