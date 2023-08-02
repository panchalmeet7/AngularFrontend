import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}

  canActivate() {
    // guard returns true or false based on some conditions
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please Login First!!',
      });
      this.route.navigate(['login']);
      return false;
    }
  }
}
