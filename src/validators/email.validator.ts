import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
  static emailFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return !emailRegex.test(value) ? { emailFormat: true } : null;
  }
}
