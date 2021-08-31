import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HobbyService } from '../hobby.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  hobby: any;
  count: number = 1;
  status = ["INACTIVE", "ACTIVE"];
  isEdit: boolean = false;
  editIndex: number = -1;

  constructor(private tokenService: TokenserviceService,
    private hobbyService: HobbyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {
      this.hobbyService.hobbyList().subscribe(data => {
        if (data.statusCode == 200) {
          this.hobby = data.data;
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  onPageChange(page: any) {
    this.hobbyService.hobbyList().subscribe(data => {
      if (data.statusCode != 200) {
        this.validate(data.statusCode);
        alert(data.message);
      } else {
        this.hobby = data.data;
      }
    });
  }

  onStatusUpdate(index: number) {
    const status = (this.hobby[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.hobby[index].id,
      "name": this.hobby[index].name,
      "status": status
    }
    this.hobbyService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
        this.hobby[index].status = status;
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
        "id": this.hobby[index].id,
        "name": name,
        "status": this.hobby[index].status
      }
      this.hobbyService.updateStatus(body).subscribe(data => {
        if (data.statusCode == 200)
          this.hobby[index].name = name;
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
      this.hobbyService.addHobby(name).subscribe(data => {
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
