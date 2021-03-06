import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: any;
  count: number = 0;
  page: any;
  limit: number = 3;
  pageNo: number = 0;
  categoryfilter: string = ""
  status = ["INACTIVE", "ACTIVE"];
  searchWord: string = "";
  filterStatus: number = -1;

  constructor(private tokenService: TokenserviceService,
    private orderService: OrderService,
    private router: Router,
    ) { }

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
    const status = (this.order[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.order[index].id,
      "status": status
    }
    this.orderService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
        this.order[index].status = status;
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
    this.orderService.delete(id).subscribe(data=>{
      alert(data.message);
      window.location.reload();
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  private listingApiCall(data: any) {
    this.orderService.orderList(data).subscribe(data => {
      if (data.statusCode == 200) {
        this.order = data.data;
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
