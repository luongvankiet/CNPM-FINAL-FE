import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-body-header',
  templateUrl: './body-header.component.html',
  styleUrls: ['./body-header.component.css']
})
export class BodyHeaderComponent implements OnInit {
  public categories;
  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

}
