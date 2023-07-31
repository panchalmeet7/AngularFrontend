import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  hide = true;
  
  constructor (private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  hideshowPass(){
    this.isText = !this.isText; // make it true and false 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"; //if its text then show open eye icon
    this.isText ? this.type = "text" : this.type = "password"; //if its open eye icon then type text 
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{ 
          console.log(res);
        },
        error :(err)=>{ 
          console.log(err.error.message)
        },  
      })
    }
    else{
      alert('form is invalid!!');
    }
  }
}
