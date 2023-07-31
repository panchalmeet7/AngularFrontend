import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  type:string = "password";
  isText : boolean = false;
  eyeIcon :string = "fa-eye-slash"
  signupForm! : FormGroup;

  constructor (private fb: FormBuilder, private auth: AuthService){}
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onRegister(){
    if(this.signupForm.valid){
      // const playLoad = {
      //   firstName: this.signupForm.get('FirstName')?.value || '',
      // }
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(response) => { 
          console.log(response);
          alert("succcess!");
          this.signupForm.reset();
          window.location.href="/login";

        },
        error :(error)=>{
          console.log(error)
        },
      })
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
