import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public users;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  public Editor = ClassicEditor;

  public userData = {
    user: null,
    company: null
  }
  constructor(
    private _userService: UserService,
    private _modalService: BsModalService,
    private _snotifyService: SnotifyService,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      data => {
        this.users = data
        this.dtTrigger.next();
      }
    )
  }

  openModal(template: TemplateRef<any>, user) {
    this.userData.user = user;
    this.userData.company = user.companies;
    this.modalRef = this._modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }

  onSelectFile(event, user) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        user.profileImg = event.target.result;
      }
    }
  }

  onChangeLogo(event, company) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        company.logo_url = event.target.result;
      }
    }
  }

  submitEdit(user) {
    this._userService.updateUser(this.userData.user).subscribe(
      data => { 
        user = data;
      }
    )
    this._userService.updateCompany(this.userData.company).subscribe(
      data => {
        user.companies = data;
        this._snotifyService.success("Cập nhật thành công", "Success");
        this.modalRef.hide();
      }
    )
  }

}
