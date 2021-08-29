import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenserviceService } from '../tokenservice.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendor:any;
  count:number = 0;
  page:any;
  limit:number = 1;
  pageNo:number  = 0;
  categoryfilter:string = ""
  status= ["INACTIVE" , "ACTIVE"];

  constructor(private tokenService:TokenserviceService,
    private vendorService:VendorService,
    private router:Router,) { }

  ngOnInit(): void {
    if(this.tokenService.getToken() != null){
      //this.router.navigate(["/login"]);
    }else{

      const data = {
        "page" : this.pageNo,
        "limit" : this.limit,
      };
      this.vendorService.customerList(data).subscribe(data=>{
          if(data.statusCode == 200){
            this.vendor = data.data;
            this.page = data.result;
            this.count = this.page.pageno * this.limit + 1;
          }else{
            this.validate(data.statusCode);
            alert(data.message);
          }
      });
    }
  }

  onPageChange(page:any){

    this.pageNo = page;
    const data = {
      "page" : this.pageNo,
      "limit" : this.limit,
    }

    this.vendorService.customerList(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.vendor = data.data;
        this.page = data.result;
      }
    });
  }

  onStatusUpdate(index:number){
    this.vendor[index].status = (this.vendor[index].status == "1") ? 0 : 1;
    const body = {
      "id" : this.vendor[index].id,
      "status" : this.vendor[index].status
    }
    this.vendorService.updateStatus(body).subscribe(data=>{
      if(data.statusCode == 200){
        alert("Success..!! Status Updated");
      }else{
        this.validate(data.statusCode);
        alert(data.message);
      }
    });
  }

  onVisit(id:string){
    this.tokenService.setVendorID(id);
    this.router.navigate(["/vendordetail"]);
  }

  counter(i: number) {
    return new Array(i);
  }

  validate(code:any){
    if(code == 401)
      this.router.navigate(["/vendor/login"]);
  }

}
