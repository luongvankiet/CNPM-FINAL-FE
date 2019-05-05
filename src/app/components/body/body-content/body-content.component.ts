import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css']
})
export class BodyContentComponent implements OnInit {
  public posts = [];
  public images = [];
  public returnedArray = [];
  public category;
  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      param => {
        if (param['category_slug']) {
          this.getCategoryBySlug(param['category_slug']);
        } else {
          this.getAllPosts();
        }

      })
  }

  getAllPosts() {
    this._postService.getAllPosts().subscribe(
      data => {
        this.handlePosts(data)
      }
    );
  }

  getCategoryBySlug(slug) {
    this._categoryService.getCategoriesBySlug(slug).subscribe(
      (data: any) => {
        this.category = data;
        this.handlePosts(data.posts);
      }
    )
  }

  handlePosts(data) {
    this.posts = data;
    this.returnedArray = this.posts.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.posts.slice(startItem, endItem);
  }

  postDetail(post){
    this._router.navigate([`/posts/${post.post_slug}`]);
  }
}
