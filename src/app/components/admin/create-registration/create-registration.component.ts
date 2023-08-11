import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
})
export class CreateRegistrationComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      phoneNo: [],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      requireTrainer: [''],
      gender: [''],
      packageType: [''],
      interestsList: [''],
      beenGym: [''],
      enquiryDate: [''],
    });

    this.registrationForm.controls['height'].valueChanges.subscribe((res) =>
      this.calculateBmi(res)
    );
  }

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

  onSubmit() {
    // const payload = {
    //   firstName: this.registrationForm?.get('fname')?.value || '',
    //   lastName: this.registrationForm?.get('lname')?.value || '',
    // };
    console.log(this.registrationForm.value);
  }
}
