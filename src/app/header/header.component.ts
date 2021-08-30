import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string = "";
  constructor(
    private router: Router,
    private tokenservice: TokenserviceService) {

  }

  ngOnInit(): void {
    this.name = this.tokenservice.getName();
  }

  logout() {
    this.router.navigate(["/login"]);
    localStorage.removeItem("token");
  }

}
