import { Component, OnInit, TemplateRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from 'src/app/services/category/category.service';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-create-post',
  templateUrl: './body-create-post.component.html',
  styleUrls: ['./body-create-post.component.css']
})
export class BodyCreatePostComponent implements OnInit {
  public newPost = {
    post_title: null,
    post_content: null,
    category_id: null,
    user_id: null,
    products: Array<any>()
  }

  public newProduct = {
    product_name: null,
    price: null,
    unit: null,
    images: Array<any>()
  }
  public categories;
  public user;

  public Editor = ClassicEditor;
  modalRef: BsModalRef;
  constructor(
    private _categoryService: CategoryService,
    private modalService: BsModalService,
    private _snotifyService: SnotifyService,
    private _postService: PostService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getAllCategories();
    this.newPost.user_id = this.user.id;
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => this.categories = data
    )
  }

  createNewPost() {
    this._postService.createPost(this.newPost).subscribe(
      (data: any) => {
        this._snotifyService.success('Tạo bài viết thành công!', 'Success');
        this._router.navigate([`/posts/${data.post_slug}`]);
      }, 
      error => {
        this._snotifyService.error('Đã xảy ra lỗi! Vui lòng thử lại', 'Error');
      }
    )
  }

  addProduct() {
    let temp = {
      product_name: null,
      price: null,
      unit: null,
      category_id: null,
      post_id: null,
      images: Array<any>()
    }
    if (this.newProduct.product_name == null || this.newProduct.price == null || this.newProduct.unit == null) {
      this._snotifyService.error('Invalid input', 'Error');
    } else {
      this.newPost.products.push(this.newProduct);
      this.newProduct = temp;
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let image = {
        imageUrl: null
      }
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        image.imageUrl = event.target.result;
        this.newProduct.images.push(image);
      }
    }
  }

  onUploadFile(event, product) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let image = {
        imageUrl: null
      }
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        image.imageUrl = event.target.result;
        product.images.push(image);
      }
    }
  }

  removeImg(img, images) {
    let imgIndex = images.indexOf(img);
    if (imgIndex !== -1) {
      images.splice(imgIndex, 1);
    }
  }

  removeProduct(product, products) {
    let index = products.indexOf(product);
    if (index !== -1) {
      products.splice(index, 1);
    }
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
