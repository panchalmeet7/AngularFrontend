import { FormGroup } from '@angular/forms';

export function ConfirmPasswordValidator(
  controlName: string,
  MatchcontrolName: string
) {
  return (formgroup: FormGroup) => {
    const passwordControl = formgroup.controls[controlName];
    const confirmPasswordControl = formgroup.controls[MatchcontrolName];
    if (
      confirmPasswordControl.errors &&
      confirmPasswordControl.errors['ConfirmPasswordValidator']
    ) {
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ ConfirmPasswordValidator: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
