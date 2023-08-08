import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  formValidations(form: FormGroup, key: string, message: any) {
    const field = form.get(key);
    if (field) {
      if (field.errors && field.touched) {
        if (field.hasError('required')) {
          return message[key].required;
        }
        if (field.hasError('pattern')) {
          return message[key].pattern;
        }
      }
    }
  }
}
