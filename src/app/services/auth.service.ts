import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}

  signUp(RegisterObj: any) {
    return this.http.post<any>(
      `${environment.baseUrl}/Account/Register`,
      RegisterObj
    );
  }

  login(loginObj: any) {
    return this.http.post<any>(
      `${environment.baseUrl}/Account/Authenticate`,
      loginObj
    );
  }

  getUserData() {
    return this.http.get<any>(`${environment.baseUrl}/Account/GetAllUsers`);
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
}
