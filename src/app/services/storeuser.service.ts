import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreuserService {
  //first we will store token's name and role in observable
  //and after refresh it will be displayed via token
  private fullName$ = new BehaviorSubject<string>(''); //$ is for observable
  private role$ = new BehaviorSubject<string>('');
  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable(); //creating a obeservable (creating a schema)
  }

  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
}
