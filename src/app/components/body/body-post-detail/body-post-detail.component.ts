import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body-post-detail',
  templateUrl: './body-post-detail.component.html',
  styleUrls: ['./body-post-detail.component.css']
})
export class BodyPostDetailComponent implements OnInit {
  public post;
  public images = [];
  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      param => {
        this.getPostsBySlug(param["post_slug"]);
      }
    )
  }

  getPostsBySlug(slug) {
    this._postService.getPostsBySlug(slug).subscribe(
      data => {
        this.post = data;
        this.getImages(data);
      }
    )
  }

  getImages(data) {
    data.products.forEach(product => {
      product.images.forEach(image => {
        this.images.push(image);
      });
    });
  }
}
