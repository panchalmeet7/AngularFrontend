import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  currentDate: string = new Date().toISOString();
  constructor(
    private authSerive: AuthService,
    private userStoreService: StoreuserService,
    private router: Router
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date().toISOString();
    }, 1000); // Update every 1000 milliseconds (1 second)

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
