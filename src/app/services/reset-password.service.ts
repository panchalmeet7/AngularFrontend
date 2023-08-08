import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  sendPasswordResetLink(email: string) {
    return this.http.post<any>(
      `${environment.baseUrl}/Account/send-rest-email/${email}`,
      {}
    );
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${environment.baseUrl}/Account/reset-password`,
      resetPasswordObj
    );
  }
}
