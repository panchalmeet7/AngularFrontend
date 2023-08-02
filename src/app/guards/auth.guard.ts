import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  canActivate() {
    // guard returns true or false based on some conditions
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('ERROR', 'Please Login First!!');
      this.route.navigate(['login']);
      return false;
    }
  }
}
