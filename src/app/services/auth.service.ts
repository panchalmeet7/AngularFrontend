import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  constructor(private httpClient: HttpClient, private route: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(RegisterObj: any) {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/Account/Register`,
      RegisterObj
    );
  }

  login(loginObj: any) {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/Account/Authenticate`,
      loginObj
    );
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService(); // JwtHelperService helps to decrypt the token
    const token = this.getToken()!; // added '!' because it might be undefined
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    return this.userPayload.role;
  }
}
