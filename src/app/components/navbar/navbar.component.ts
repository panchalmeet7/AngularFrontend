import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreuserService } from 'src/app/services/storeuser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public fullName: string = '';
  public role: string = '';
  constructor(
    private authSerive: AuthService,
    private userStoreService: StoreuserService
  ) {}

  ngOnInit() {
    this.userStoreService.getFullNameFromStore().subscribe({
      next: (val) => {
        let roleFromToken = this.authSerive.getRoleFromToken(); //they are both observable
        let fullNameFromToken = this.authSerive.getFullNameFromToken();
        this.role = val || roleFromToken;
        this.fullName = val || fullNameFromToken;
      },
    });
  }

  LogOut() {
    this.authSerive.signout();
  }
}
