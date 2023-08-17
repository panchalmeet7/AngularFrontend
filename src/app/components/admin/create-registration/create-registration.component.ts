import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsPattern } from 'src/app/common/validator.static';
import { Members } from 'src/app/models/members.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
})
export class CreateRegistrationComponent implements OnInit {
  private validatorsPattern = ValidatorsPattern;
  public packages: string[] = ['Monthly', 'Quaterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public importantLists: string[] = [
    'Toxic fat reduction',
    'Fitness',
    'Sugar craving body',
    'Weight loss',
    'Muscle building',
    'Bodybuilding',
    'Diet',
    'Nutrition',
    'Healthy eating habits',
    'Exercise',
    'Strength training',
    'Cardiovascular fitness',
    'Yoga',
    'Pilates',
    'Aerobics',
    'Gymnastics',
    'Boxing',
  ];

  public registrationForm!: FormGroup;
  public memberID!: number;
  public isUpdateActive: boolean = false;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.pattern(this.validatorsPattern.email)],
      phoneNo: ['', Validators.pattern(this.validatorsPattern.mobileNumber)],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      bmi: [''],
      bmiResult: [''],
      requireTrainer: ['', Validators.required],
      gender: ['', Validators.required],
      packageType: ['', Validators.required],
      interestsList: ['', Validators.required],
      beenGym: ['', Validators.required],
      enquiryDate: ['', Validators.required],
    });

    this.registrationForm.controls['height'].valueChanges.subscribe((res) =>
      this.calculateBmi(res)
    );

    // Activated route to get the id from the url
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 0) {
        this.memberID = params['id']; //we got this from url
        this.apiService.getSingleMemberById(this.memberID).subscribe({
          next: (res) => {
            this.isUpdateActive = true;
            this.fillForm(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.memberID = 0;
      }
    });
  }

  // fill all the inputs
  fillForm(member: Members) {
    console.log(member);
    this.registrationForm.setValue({
      firstName: member.firstName,
      lastName: member.lastName,
      emailId: member.emailId,
      phoneNo: member.phoneNo,
      weight: member.weight,
      height: member.height,
      bmi: member.bmi,
      bmiResult: member.bmiResult,
      requireTrainer: member.requireTrainer,
      gender: member.gender,
      packageType: member.packageType,
      interestsList: member.interestsList,
      beenGym: member.beenGym,
      enquiryDate: member.enquiryDate,
    });
  }

  // calculating bmi and bmiResult based on height & weight and setting it into form
  calculateBmi(heightVal: number) {
    const weight = this.registrationForm.value.weight;
    const height = heightVal;
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi > 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  // on click of submit btn
  onSubmit() {
    console.log(this.registrationForm.value);
    this.apiService.onRegistration(this.registrationForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('SUCCESS');
        // this.registrationForm.reset();
        this.route.navigate(['list']);
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error('ERROR');
      },
    });
  }

  // on click of update btn
  onUpdate() {
    console.log(this.registrationForm.value);
    this.apiService
      .updateMembers(this.registrationForm.value, this.memberID)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success(
            'SUCCESS',
            'Member Details Updated Successfully!!'
          );
          this.route.navigate(['list']);
        },
        error: (err) => {
          console.log(err.error);
          this.toastr.error('ERROR');
        },
      });
  }
}
