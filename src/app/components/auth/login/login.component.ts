import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login_form = {
    email: null,
    password: null
  }
  public isLoading;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _snotifyService: SnotifyService
  ) { }

  ngOnInit() {
  }
  loginSubmit() {
    this.isLoading = true;
    let form = {
      email: null,
      password: null
    }
    form.email = this.login_form.email.toLowerCase();
    form.password = this.login_form.password;
    
    this._authService.login(form).subscribe(
      data => {
        this.getUser(data);
        this._snotifyService.success('Login success !', 'Success', {
          showProgressBar: false,
          timeout: 5000,
        });
        this.isLoading = false;
      },
      error => {
        this._snotifyService.error('Email or password doesn\'t exist. Please try again !', 'Error', {
          showProgressBar: false,
          timeout: 5000,
        });
        this.isLoading = false;
      });
  }

  getUser(data) {
    this._authService.getUser(data.access_token);
  }
}
