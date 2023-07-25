import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  type:string = "password";
  isText : boolean = false;
  eyeIcon :string = "fa-eye-slash"
   
  constructor () {}

  hideshowPass(){
  this.isText = !this.isText; // make it true and false 
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"; //if its text then show open eye icon
  this.isText ? this.type = "text" : this.type = "password"; //if its open eye icon then type text 
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
