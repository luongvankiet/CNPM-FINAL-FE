import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  public products;
  public images;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  constructor(
    private _productService: ProductService,
    private _modalService: BsModalService,
    private _snotifyService: SnotifyService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAllProduct();
  }

  getAllProduct() {
    this._productService.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.dtTrigger.next();
      });
  }

  openModal(template: TemplateRef<any>, product) {
    this.images = product.images;

    this.modalRef = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md modal-dialog-scrollable' }),
    );
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

  onUpdateProductImage(event, img){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        img.imageUrl = event.target.result;
        this._imageService.updateImage(img).subscribe();
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

  editProduct(product) {
    this._productService.editProduct(product).subscribe(
      data => {
        this._snotifyService.success("Cập nhật sản phẩm thành công", "Success");
        this.modalRef.hide();
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
}
