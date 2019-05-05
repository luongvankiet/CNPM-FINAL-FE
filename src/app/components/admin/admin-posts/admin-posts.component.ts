import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from 'src/app/services/category/category.service';
import { SnotifyService } from 'ng-snotify';
import { ProductService } from 'src/app/services/product/product.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  public posts;
  public categories;
  public category;
  public products;
  public user;
  public users;
  public showInput;
  public showInput2;
  public images;
  public temp;
  public postEditForm = {
    id: null,
    post_title: null,
    post_content: null,
    category_id: null,
    user_id: null,
    category_name: null,
    active: null
  }

  public imageForm = {
    image: null,
    product_id: null
  }

  public newProduct = {
    product_number: null,
    price: null,
    unit: null,
    category_id: null,
    post_id: null
  }

  public newPost = {
    post_title: null,
    post_content: null,
    category_id: null,
    user_id: null,
    product: null,
  }

  public itemsPerSlide = 5;
  public singleSlideOffset = true;

  public Editor = ClassicEditor;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  constructor(
    private _postService: PostService,
    private _modalService: BsModalService,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _snotifyService: SnotifyService,
    private _imageService: ImageService,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAllCategories();
    this.getAllUsers();
    this._route.params.subscribe(
      params => {
        if (params['slug']) {
          this.getCategoriesBySlug(params['slug'])
        } else if (params['user_id']) {
          this.getUserById(params['user_id']);
        } else {
          this.getAllPosts();
        }
      }
    )
  }

  getAllPosts() {
    this._postService.getAllPosts().subscribe(
      data => {
        this.posts = data;
        this.dtTrigger.next();
      }
    );
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  getCategoriesBySlug(slug) {
    this._categoryService.getCategoriesBySlug(slug).subscribe(
      (data: any) => {
        this.category = data;
        this.posts = data.posts;
        this.dtTrigger.next();
      }
    )
  }

  getUserById(id) {
    this._userService.getUserById(id).subscribe(
      (data: any) => {
        this.user = data;
        this.posts = data.posts;
        this.dtTrigger.next();
      }
    )
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      data => this.users = data
    )
  }

  showInputForm(value, post) {
    if (value == "other") {
      this.showInput = true;
    } else {
      this.showInput = false;
      post.category_id = value;
    }
  }

  showInputForm2(value) {
    if (value == "other") {
      this.showInput2 = true;
    } else {
      this.showInput2 = false;
      this.newPost.category_id = value;
    }
  }

  openModal(template: TemplateRef<any>, post) {
    this.products = post.products;
    this.newProduct.category_id = post.category_id;
    this.newProduct.post_id = post.id;
    this.modalRef = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  openModal2(template: TemplateRef<any>, images) {
    this.images = images;
    this.modalRef2 = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md modal-dialog-scrollable' }),
    );
  }

  submitEdit(post) {
    this.postEditForm.id = post.id;
    this.postEditForm.post_title = post.post_title;
    this.postEditForm.post_content = post.post_content;
    this.postEditForm.category_id = post.category_id;
    this.postEditForm.user_id = post.user_id;
    this.postEditForm.active = post.active;
    if (this.postEditForm.category_name == "" || this.postEditForm.category_name == null) {
      this.editPost(this.postEditForm, post);
    } else {
      this._snotifyService.confirm('Xác nhận tạo thể loại mới', 'Confirm', {
        timeout: 5000,
        showProgressBar: true,
        buttons: [
          {
            text: 'Confirm', action: (toast) => {
              this.editPost(this.postEditForm, post);
              this._snotifyService.remove(toast.id);
            }
          },
          { text: 'Cancel', action: (toast) => { this._snotifyService.remove(toast.id); } },
        ]
      });

    }
  }

  //edit post
  editPost(postForm, post) {
    let postData;
    this._postService.editPost(postForm).subscribe(
      data => {
        postData = data;
        this._snotifyService.success("Chỉnh sửa bài viết thành công!", "Success");
        this.getAllCategories();
        post.category_id = postData.category_id;
        this.showInput = false;
        this.modalRef.hide();
      },
      error => {
        this._snotifyService.error("Đã xảy ra lỗi! Xin vui lòng kiểm tra lại", "Error");
      }
    )
  }

  //Confirm remove image
  confirmRemoveImg(img, images) {
    this._snotifyService.confirm("Xác nhận xóa!", "Confirm", {
      timeout: 5000,
      showProgressBar: true,
      buttons: [
        {
          text: 'Confirm', action: (toast) => { this.removeImg(img, images); this._snotifyService.remove(toast.id); }
        },
        { text: 'Cancel', action: (toast) => { this._snotifyService.remove(toast.id); } },
      ]
    })
  }

  //remove image
  removeImg(img, images) {
    this._imageService.deleteImage(img).subscribe(
      data => {
        this._snotifyService.success('Xóa thành công!', 'Success');
        let imgIndex = images.indexOf(img);
        if (imgIndex !== -1) {
          images.splice(imgIndex, 1);
        }
      },
      error => {
        this._snotifyService.error('Xóa thất bại! Xin vui lòng kiểm tra lại thông tin', 'Error');
      }
    )
  }

  //Get image file
  onSelectFile(event, product_id) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var image = {
        imageUrl: null,
        product_id: null
      };

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        image.imageUrl = event.target.result;
        image.product_id = product_id;
        this.createImage(image);
      }
    }
  }

  createImage(data) {
    this._imageService.createImage(data).subscribe(
      data => {
        this._snotifyService.success("Thêm thành công", "Success");
        this.images.push(data);
      }
    )
  }

  createProduct() {
    this._productService.createProduct(this.newProduct).subscribe(
      data => {
        this._snotifyService.success("Tạo sản phẩm thành công", "Success");
        this.products.push(data);
      },
      error => {
        this._snotifyService.success("Tạo sản phẩm thất bại! Xin kiểm tra lại", "Success");
      }
    )
  }

  editProduct(product) {
    this._productService.editProduct(product).subscribe(
      data => {
        this._snotifyService.success("Cập nhật sản phẩm thành công", "Success");
        this.modalRef2.hide();
      },
      error => {
        this._snotifyService.error("Cập nhật sản phẩm thất bại", "Error", { timeout: 5000, showProgressBar: true });
      }
    )
  }

  confirmDeleteProduct(product, products) {
    this._snotifyService.confirm("Xác nhận xóa!", "Confirm", {
      timeout: 5000,
      showProgressBar: true,
      buttons: [
        {
          text: 'Confirm', action: (toast) => { this.deleteProduct(product, products); this._snotifyService.remove(toast.id); }
        },
        { text: 'Cancel', action: (toast) => { this._snotifyService.remove(toast.id); } },
      ]
    });
  }

  deleteProduct(product, products) {
    this._productService.deleteProduct(product).subscribe(
      data => {
        this._snotifyService.success('Xóa thành công!', 'Success');
        let index = products.indexOf(product);
        if (index !== -1) {
          products.splice(index, 1);
        }
      },
      error => {
        this._snotifyService.error('Xóa thất bại! Xin vui lòng kiểm tra lại thông tin', 'Error');
      }
    )
  }

  onUpdateProductImage(event, img) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        img.imageUrl = event.target.result;
        this._imageService.updateImage(img).subscribe();
      }
    }
  }
}
