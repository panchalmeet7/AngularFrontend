import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);

  type:string = "password";
  isText : boolean = false;
  eyeIcon :string = "fa-eye-slash";
  loginForm! : FormGroup;

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  hideshowPass(){
    this.isText = !this.isText; // make it true and false 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"; //if its text then show open eye icon
    this.isText ? this.type = "text" : this.type = "password"; //if its open eye icon then type text 
  }

  onSubmit(){
    if(this.loginForm.valid){
      //api call
      console.log(this.loginForm.value);
      this.loginForm.reset();
    }
    else{
      // this.validateAllFormFields(this.loginForm);
      alert('form is invalid!!');
    }
  }
 
  // another way 
  
  // private validateAllFormFields(formGroup: FormGroup){
  //   Object.keys(formGroup.controls).forEach(field =>{
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf: true});
  //     }
  //     else if(control instanceof FormGroup){
  //       this.validateAllFormFields(control);
  //     }
  //   })
  // }
}
