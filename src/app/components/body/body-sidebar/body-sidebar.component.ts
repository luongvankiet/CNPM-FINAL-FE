import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostService } from 'src/app/services/post/post.service';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body-sidebar',
  templateUrl: './body-sidebar.component.html',
  styleUrls: ['./body-sidebar.component.css']
})
export class BodySidebarComponent implements OnInit {
  public latestPosts;
  public categories = [];
  public user;
  public isLoggedIn;
  constructor(
    private _categoryService: CategoryService,
    private _authService: AuthService,
    private _postService: PostService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status });
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.getAllCategories();
    this.updateSidebar();
    this.getLatestPosts();
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.handleCategoriesData(data);
      }
    )
  }

  handleCategoriesData(data) {
    this.categories = data;
  }

  getLatestPosts() {
    this._postService.getLatestPosts().subscribe(
      data => {
        this.latestPosts = data;
      }
    );
  }

  updateSidebar() {
    this._authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status });
    this._authService.user$.subscribe(user => this.user = user);
  }
}
