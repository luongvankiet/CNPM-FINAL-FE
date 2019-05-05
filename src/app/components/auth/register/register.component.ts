import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public register_form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    company_name: null,
    phone_number: null,
    fax_number: null,
    address: null,
    description: null,
    website_url: null
  }
  constructor(
    private _authService: AuthService,
    private _snotifyService: SnotifyService
  ) { }

  ngOnInit() {
  }

  registerSubmit(){
    this.register_form.email.toLowerCase();
    this._authService.register(this.register_form).subscribe(
      data => {
        this._authService.login(this.register_form).subscribe(
          user => {
            this.getUser(user);
            this._snotifyService.success('Login success !', 'Success', {
              showProgressBar: false,
              timeout: 5000,
            });
          }
        )
      }, 
      error => {
        this._snotifyService.error(error.error.message, 'Error', {
          showProgressBar: false,
          timeout: 5000,
        });
      }
    )
  }

  
  getUser(data) {
    this._authService.getUser(data.access_token);
  }

}
