import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  
  type:string = "password";
  isText : boolean = false;
  eyeIcon :string = "fa-eye-slash"
  signupForm! : FormGroup;

  constructor (private fb: FormBuilder){}
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
    }
    else{
      alert("Please fill all fields");
    }
  }
  hideshowPass(){
  this.isText = !this.isText; // make it true and false 
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"; //if its text then show open eye icon
  this.isText ? this.type = "text" : this.type = "password"; //if its open eye icon then type text 
  }
}
