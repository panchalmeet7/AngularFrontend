import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Members } from '../models/members.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get<any>(`${environment.baseUrl}/Account/Users`);
  }

  // gym members CRUD
  onRegistration(registerObj: Members) {
    return this.http.post<Members>(`${environment.apiUrl}`, registerObj);
  }

  getAllRegisteredMembers() {
    return this.http.get<Members[]>(`${environment.apiUrl}`);
  }

  updateMembers(registerObj: Members, id: number) {
    return this.http.put<Members>(`${environment.apiUrl}/${id}`, registerObj);
  }

  deleteMember(id: number) {
    return this.http.delete<Members>(`${environment.apiUrl}/${id}`);
  }

  getSingleMemberById(id: number) {
    return this.http.get<Members>(`${environment.apiUrl}/${id}`);
  }
}
