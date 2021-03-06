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
  product:any;
  userid: string = "";
  page:any;
  pageNo: number = 0;
  limit: number = 1;
  count: number = 0;
  status = ["INACTIVE", "ACTIVE"];
  searchWord: string = "";
  filterStatus: number = -1;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private tokenService: TokenserviceService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {
      this.vendorService.vendorProfile().subscribe(data => {
        if (data.statusCode == 200) {
          this.vendor = data.data;
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });

      const data = {
        "id" : this.tokenService.getVendorId(),
        "page": this.pageNo,
        "limit": this.limit,
        "searchKeyword": this.searchWord,
        "sortFileld": "",
        "status": this.filterStatus
      };
      this.listingApiCall(data);

    }
  }

  onPageChange(page: any) {
    this.pageNo = page;
    const data = {
      "id" : this.tokenService.getVendorId(),
      "page": this.pageNo,
      "limit": this.limit,
      "searchKeyword": this.searchWord,
      "sortFileld": "",
      "status": this.filterStatus
    }
    this.listingApiCall(data);
  } 

  onStatusUpdate(index: number) {
    this.product[index].status = (this.product[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.product[index].id,
      "status": this.product[index].status
    }
    this.vendorService.updateProductStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
      } else {
        this.validate(data.statusCode);
        alert(data.message);
      }
    });
  }

  onSearch(search: string) {
    this.searchWord = search;
    const data = {
      "id" : this.tokenService.getVendorId(),
      "page": this.pageNo,
      "limit": this.limit,
      "searchKeyword": this.searchWord,
      "sortFileld": "",
      "status": this.filterStatus
    };
    this.listingApiCall(data);
  }

  onStatusFilter(event: any) {
    this.filterStatus = this.status.indexOf(event.target.value);
    this.pageNo = 0;
    const data = {
      "id" : this.tokenService.getVendorId(),
      "page": this.pageNo,
      "limit": this.limit,
      "searchKeyword": this.searchWord,
      "sortFileld": "",
      "status": this.filterStatus
    };
    this.listingApiCall(data);
  }

  private listingApiCall(data: any) {
    this.vendorService.productList(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.product = data.data;
        this.page = data.result;
        this.count = this.page.pageno * this.limit + 1;
      } else {
        this.validate(data.statusCode);
        alert(data.message);
      }
    });
  }
  
  validate(code: any) {
    if (code == 401)
      this.router.navigate(["/login"]);
  }

  counter(i: number) {
    return new Array(i);
  }

}
