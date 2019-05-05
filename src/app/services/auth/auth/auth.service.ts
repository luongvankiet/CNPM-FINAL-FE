import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl = "http://localhost:8000/api/auth";
  public user$ = new Subject<any>();
  public isLoggedIn$ = new Subject<any>();
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  userChange(value) {
    if (value == null) {
      localStorage.removeItem('user');
      this.user$.next(value);
    } else {
      localStorage.setItem('user', JSON.stringify(value));
      this.user$.next(value);
    }
  }

  statusChange(value) {
    this.isLoggedIn$.next(value);
  }

  login(data) {
    return this._http.post(`${this._apiUrl}/login`, data);
  }

  register(data){
    return this._http.post(`${this._apiUrl}/register`, data);
  }

  getUser(token) {
    this._http.post(`${this._apiUrl}/me?token=${token}`, token).subscribe(
      data => {
        this.redirectUser(data);
        this.userChange(data);
        this.statusChange(true);
      }
    );
  }

  redirectUser(user) {
    if (user.role == "admin") {
      this._router.navigate(['admin']);
    } else {
      this._router.navigate(['/']);
    }
  }

  logout() {
    this.statusChange(false);
    this.userChange(null);
  }
}
