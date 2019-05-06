import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { DataTableDirective } from 'angular-datatables';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  public categories;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public newCategory = {
    category_name: null
  }
  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _modalService: BsModalService,
    private _snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        this.dtTrigger.next();
      }
    )
  }

  categoryDetail(slug) {
    this._router.navigate([`/admin/categories/${slug}`]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  submitEdit(category) {
    this._categoryService.editCategory(category).subscribe(
      data => {
        this._snotifyService.success("Chỉnh sửa thành công!", "Success");
        this.rerender();
        this.modalRef.hide();
      },
      error => {
        this._snotifyService.error("Chỉnh sửa thất bại!", "Error");
      }
    )
  }

  submitCreate(form: NgForm){
    this._categoryService.createCategory(this.newCategory).subscribe(
      data => {
        this._snotifyService.success('Tạo thể loại mới thành công', 'Success');
        this.rerender();
        this.modalRef2.hide();
        form.reset();
      },
      error => {
        this._snotifyService.error("Đã xảy ra lỗi! Vui lòng thử lại", "Error");
      }
    )
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getAllCategories();
    });
  }

  confirmDeleteCategory(category) {
    this._snotifyService.confirm('Xác nhận xóa!', 'Confirm', {
      timeout: 5000,
      showProgressBar: true,
      buttons: [
        {
          text: 'Ok', action: (toast) => {
            this.deleteCategory(category);
            this._snotifyService.remove(toast.id);
          }
        },
        { text: 'Cancel', action: (toast) => { this._snotifyService.remove(toast.id); } },
      ]
    });
  }

  deleteCategory(category){
    this._categoryService.deleteCategory(category).subscribe(
      data => {
        this._snotifyService.success('Xóa thành công!', 'Success');
        this.rerender();
      },
      error => this._snotifyService.error('Đã xảy ra lỗi!', 'Error')
    );
  }
}
