import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: any;
  count: number = 1;
  status = ["INACTIVE", "ACTIVE"];
  isEdit: boolean = false;
  editIndex: number = -1;

  constructor(private tokenService: TokenserviceService,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(["/login"]);
    } else {
      this.categoryService.categoryList().subscribe(data => {
        if (data.statusCode == 200) {
          this.category = data.data;
        } else {
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  onPageChange(page: any) {
    this.categoryService.categoryList().subscribe(data => {
      if (data.statusCode != 200) {
        this.validate(data.statusCode);
        alert(data.message);
      } else {
        this.category = data.data;
      }
    });
  }

  onStatusUpdate(index: number) {
    const status = (this.category[index].status == "1") ? 0 : 1;
    const body = {
      "id": this.category[index].id,
      "name": this.category[index].name,
      "status": status
    }
    this.categoryService.updateStatus(body).subscribe(data => {
      if (data.statusCode == 200) {
        alert("Success..!! Status Updated");
        this.category[index].status = status;
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
        "id": this.category[index].id,
        "name": name,
        "status": this.category[index].status
      }
      this.categoryService.updateStatus(body).subscribe(data => {
        if (data.statusCode == 200)
          this.category[index].name = name;
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
      this.categoryService.addCategory(name).subscribe(data => {
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
