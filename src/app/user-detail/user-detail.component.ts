import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  profile: any;
  userid: string = "";

  constructor(
    private customerservice: CustomerService,
    private router: Router,
    private tokenService: TokenserviceService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() != null) {
      //this.router.navigate(["/login"]);
    } else {
      this.customerservice.customerProfile().subscribe(data => {
        if (data.statusCode == 200) {
          this.profile = data.data;
          this.profile.gender = (this.profile.gender == 1) ? "MALE" : "FEMALE";
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  validate(code: any) {
    if (code == 401)
      this.router.navigate(["/login"]);
  }


}
