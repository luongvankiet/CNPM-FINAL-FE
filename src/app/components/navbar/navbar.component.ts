import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user;
  public isLoggedIn;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status});
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.updateNavbar();
  }

  updateNavbar() {
    this._authService.isLoggedIn$.subscribe(status => { this.isLoggedIn = status });
    this._authService.user$.subscribe(user => this.user = user);
  }

  logout(e: MouseEvent) {
    e.preventDefault();
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
