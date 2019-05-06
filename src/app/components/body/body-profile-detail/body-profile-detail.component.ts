import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { SnotifyService } from 'ng-snotify';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-body-profile-detail',
  templateUrl: './body-profile-detail.component.html',
  styleUrls: ['./body-profile-detail.component.css']
})
export class BodyProfileDetailComponent implements OnInit {
  public user;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _snotifyService: SnotifyService,
    private _postService: PostService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        if(params['id']){
          this.getUser(params['id']);
        } else {
          let user = JSON.parse(localStorage.getItem('user'));
          this.getUser(user.id);
        }
      }
    )
  }
  
  getUser(id){
    this._userService.getUserById(id).subscribe(
      data => this.user = data
    )
  }

  onConfirmDeletePost(e: MouseEvent, post, posts){
    e.preventDefault();
    this._snotifyService.confirm("Xác nhận xóa bài viết", "Confirm", {
      timeout: 5000,
      showProgressBar: true,
      buttons: [
        {
          text: 'Confirm', action: (toast) => { this.onDeletePost(post, posts); this._snotifyService.remove(toast.id); }
        },
        { text: 'Cancel', action: (toast) => { this._snotifyService.remove(toast.id); } },
      ]
    })
  }

  onDeletePost(post, posts){
    this._postService.deletePost(post.id).subscribe(
      data => {
        this._snotifyService.success("Xóa bài viết thành công", "Success");
        let index = posts.indexOf(post);
        if (index !== -1) {
          posts.slice(index, 1);
        }
      }
    )
  }
}
