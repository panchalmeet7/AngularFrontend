import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { StoreuserService } from 'src/app/services/storeuser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  fullName: string = '';
  role: string = '';
  public users: any = [];
  constructor(
    private apiService: ApiService,
    private userStoreService: StoreuserService,
    private authSerice: AuthService
  ) {}

  ngOnInit() {
    this.userStoreService.getFullNameFromStore().subscribe({
      next: (val) => {
        let roleFromToken = this.authSerice.getRoleFromToken(); //they are both observable
        let fullNameFromToken = this.authSerice.getFullNameFromToken();
        this.role = val || roleFromToken;
        this.fullName = val || fullNameFromToken;
      },
    });
    // this.apiService.getUserData().subscribe((data) => {
    //   this.users = data;
    //   console.log(data);
    // });
  }
}
