import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: any;
  count: number = 1;
  status = ["INACTIVE", "ACTIVE"];
  isEdit: boolean = false;
  editIndex: number = -1;

  constructor(private tokenService: TokenserviceService,
    private countryService: CountryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {
      this.countryService.countryList().subscribe(data => {
        if (data.statusCode == 200) {
          this.country = data.data;
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  onPageChange(page: any) {
    this.countryService.countryList().subscribe(data => {
      if (data.statusCode != 200) {
        this.validate(data.statusCode);
        alert(data.message);
      } else {
        this.country = data.data;
      }
    });
  }

  onStatusUpdate(index: number) {
    const status = (this.country[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.country[index].id,
      "name": this.country[index].name,
      "status": status
    }
    this.countryService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
        this.country[index].status = status;
      } else {
        this.validate(data.statusCode);
        alert(data.message);
      }
    });
  }

  edit(index: number) {
    this.editIndex = index;
    this.isEdit = true;
  }

  onEdit(index: number, name: string) {
    if (name != "" && name.charAt(0) != " ") {
      const body = {
        "id": this.country[index].id,
        "name": name,
        "status": this.country[index].status
      }
      this.countryService.updateStatus(body).subscribe(data => {
        if (data.statusCode == 200)
          this.country[index].name = data.data.name;
        this.validate(data.statusCode);
        alert(data.message);
        this.isEdit = false;
        this.editIndex = -1;
      });
    } else {
      alert("White Space Not Allowed");
    }
  }

  onAdd(name: string) {
    if (name != "" && name.charAt(0) != " ") {
      this.countryService.addCountry(name).subscribe(data => {
        this.validate(data.statusCode);
        alert(data.message);
        window.location.reload();
      });
    } else {
      alert("White Space Not Allowed");
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  validate(code: any) {
    if (code == 401)
      this.router.navigate(["/login"]);
  }

}
