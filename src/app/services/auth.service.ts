import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl :string = "https://localhost:7059/api/Account";
  constructor(private http: HttpClient) { }

  signUp(userViewModel:any){
    return this.http.post<any>(`${this.baseUrl}/Register`, userViewModel);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/Authenticate`, loginObj);
  } 

}
