import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserData().subscribe({
      next: (Userdata) => console.log(Userdata),
      error: (error) => {
        console.log(error?.error.message);
      },
    });
  }

  LogOut() {
    this.auth.signout();
  }
}
