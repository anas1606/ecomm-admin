import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TokenserviceService } from '../tokenservice.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: any;
  userid: string = "";

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private tokenService: TokenserviceService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() != null) {
      //this.router.navigate(["/login"]);
    } else {
      this.vendorService.vendorProfile().subscribe(data => {
        if (data.statusCode == 200) {
          this.vendor = data.data;
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
