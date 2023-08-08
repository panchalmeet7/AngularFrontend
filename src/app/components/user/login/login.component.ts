import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StoreuserService } from 'src/app/services/storeuser.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  forgetPasswordEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userStoreService: StoreuserService,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }

    this.forgetPasswordForm = this.fb2.group({
      forgetPasswordEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
    });
    this.loginForm = this.fb.group({
      email: ['', Validators.pattern],
      password: ['', Validators.required],
    });
  }

  hideshowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.loginForm.reset();
            this.authService.storeToken(res.token);
            const userPayload = this.authService.decodedToken();
            this.userStoreService.setFullNameForStore(userPayload.unique_name);
            this.userStoreService.setRoleForStore(userPayload.role);
            this.toastr.success(res.message);
            this.router.navigate(['dashboard']);
          } else {
            alert('dshfgsjdfg');
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          console.log(err.message);
          this.toastr.error('ERROR', err.message);
        },
      });
    } else {
      this.toastr.warning('WARN', 'Please fill the form correctly!!');
    }
  }

  SendResetPassLink() {
    if (this.forgetPasswordForm.valid) {
      const mailSend = this.forgetPasswordForm.value.forgetPasswordEmail;
      console.log(mailSend);
      this.resetPasswordService.sendPasswordResetLink(mailSend).subscribe({
        next: (response) => {
          this.forgetPasswordForm.reset();
          this.toastr.success(`An Email has been sent to ${mailSend}`);
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);
          this.toastr.error('Email Doesnt Exist, Please Register First!!');
        },
      });
    } else {
      this.toastr.warning('WARN', 'Please fill the form correctly!!');
    }
  }
}
