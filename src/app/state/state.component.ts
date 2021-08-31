import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { StateService } from '../state.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  state: any;
  count: number = 1;
  status = ["INACTIVE", "ACTIVE"];
  isEdit: boolean = false;
  editIndex: number = -1;
  country: any;
  countryid: string = "";

  constructor(private tokenService: TokenserviceService,
    private stateService: StateService,
    private counterService: CountryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {

      this.counterService.countryList().subscribe(data => {
        if (data.statusCode == 200) {
          this.country = data.data;
        } else {
          this.validate(data.statusCode);
        }
      });

      this.stateService.stateList().subscribe(data => {
        if (data.statusCode == 200) {
          this.state = data.data;
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  onPageChange(page: any) {
    this.stateService.stateList().subscribe(data => {
      if (data.statusCode != 200) {
        this.validate(data.statusCode);
        alert(data.message);
      } else {
        this.state = data.data;
      }
    });
  }

  onStatusUpdate(index: number) {
    this.state[index].status = (this.state[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.state[index].id,
      "name": this.state[index].name,
      "status": this.state[index].status
    }
    this.stateService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
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

  onEdit(index: number, state: any, name: string) {
    if (name != "" && name.charAt(0) != " ") {
      const body = {
        "id": state.id,
        "name": name,
        "status": state.status,
      };

      this.stateService.updateStatus(body).subscribe(data => {
        if (data.statusCode == 200)
          this.state[index].name = name;
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
    if (this.countryid != "") {
      if (name != "" && name.charAt(0) != " ") {
        const data = {
          "countryId": this.countryid,
          "name": name
        };

        this.stateService.addState(data).subscribe(data => {
          this.validate(data.statusCode);
          alert(data.message);
          window.location.reload();
        });

      } else {
        alert("White Space Not Allowed");
      }
    } else {
      alert("Select Country First");
    }
  }

  onCountryChange(event: any) {
    this.countryid = (event.target.value != "Country") ? event.target.value : "";
  }

  counter(i: number) {
    return new Array(i);
  }

  validate(code: any) {
    if (code == 401)
      this.router.navigate(["/login"]);
  }

}
