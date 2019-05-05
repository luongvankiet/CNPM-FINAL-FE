import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private user;
  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.user) {
      if(this.user.role == 'admin')
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
