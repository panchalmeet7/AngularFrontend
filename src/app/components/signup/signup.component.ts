import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor (){}
  
  ngOnInit(): void {
    console.log("Signup component initialized");
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  type:string = "password";
  isText : boolean = false;
  eyeIcon :string = "fa-eye-slash"
   
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
