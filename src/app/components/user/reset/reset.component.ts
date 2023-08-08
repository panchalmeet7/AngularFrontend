import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorMessages } from 'src/app/common/errorMsgs.static';
import { ValidatorsPattern } from 'src/app/common/validator.static';
import { ConfirmPasswordValidator } from 'src/app/helpers/password-validator.validator';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  email: string = '';
  tokenForResetPassword: string = '';
  errorMessages = ErrorMessages;
  validatosPattern = ValidatorsPattern;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private resetPasswordService: ResetPasswordService,
    public formValidationService: FormValidationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
      let tokenFromUrl = params['token'];
      this.tokenForResetPassword = tokenFromUrl.replace(/ /g, '+');
      console.log(this.email);
      console.log(this.tokenForResetPassword);
    });

    this.resetPasswordForm = this.fb.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(this.validatosPattern.password),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  //method calls when user presses the change password button
  OnReset() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.email;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword =
        this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.tokenForResetPassword;
      console.log(this.resetPasswordObj);

      this.resetPasswordService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
    }
  }
}
