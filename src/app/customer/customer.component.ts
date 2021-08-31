import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: any;
  count: number = 0;
  page: any;
  limit: number = 1;
  pageNo: number = 0;
  categoryfilter: string = ""
  status = ["INACTIVE", "ACTIVE"];
  searchWord: string = "";
  filterStatus: number = -1;

  constructor(private tokenService: TokenserviceService,
    private customService: CustomerService,
    private router: Router,) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {
      const data = {
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
      "page": this.pageNo,
      "limit": this.limit,
      "searchKeyword": this.searchWord,
      "sortFileld": "",
      "status": this.filterStatus
    }
    this.listingApiCall(data);
  }

  onStatusUpdate(index: number) {
    this.customer[index].status = (this.customer[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.customer[index].id,
      "status": this.customer[index].status
    }
    this.customService.updateStatus(body).subscribe(data => {
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
      "page": this.pageNo,
      "limit": this.limit,
      "searchKeyword": this.searchWord,
      "sortFileld": "",
      "status": this.filterStatus
    };
    this.listingApiCall(data);
  }

  onVisit(id: string) {
    this.tokenService.setUserID(id);
    this.router.navigate(["/userdetail"]);
  }

  onDelete(id:string){
    this.customService.delete(id).subscribe(data=>{
      alert(data.message);
      window.location.reload();
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  private listingApiCall(data: any) {
    this.customService.customerList(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.customer = data.data;
        this.page = data.result;
        this.count = this.page.pageno * this.limit + 1;
      } else {
        this.validate(data.statusCode);
        alert(data.message);
      }
    });
  }

  private validate(code: any) {
    if (code == 401)
      this.router.navigate(["/login"]);
  }

}
