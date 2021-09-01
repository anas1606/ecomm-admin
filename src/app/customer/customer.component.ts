import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TokenserviceService } from '../tokenservice.service';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(MatSort, { static: true })sort: MatSort;

  customer: any;
  count: number = 0;
  page: any;
  limit: number = 2;
  pageNo: number = 0;
  categoryfilter: string = ""
  status = ["INACTIVE", "ACTIVE"];
  searchWord: string = "";
  filterStatus: number = -1;
  datasource: MatTableDataSource<any>;
  columns: string[] = ['#', 'name' , 'emailid' , 'country' , 'createdAt' , 'status' , 'Manage'];

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
    const status = (this.customer[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.customer[index].id,
      "status": status
    }
    this.customService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
        this.customer[index].status = status;
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
        this.datasource = new MatTableDataSource(this.customer);
        this.datasource.sort = this.sort;
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
