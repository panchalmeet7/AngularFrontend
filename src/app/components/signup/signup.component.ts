import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.signupForm.valid) {
      // const playLoad = {
      //   firstName: this.signupForm.get('FirstName')?.value || '',
      // }
      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.log(error.error.message);
          this.toastr.error('ERROR', error?.error.message);
        },
      });
    } else {
      alert('Please fill all fields');
    }
  }

  hideshowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
