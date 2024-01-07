import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const peselValidator =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: boolean } | null => {
    const value: string = control.value as string;

    if (!value) {
      return null;
    }

    const numbers = Array.from(value.slice(0, -1), Number);
    const sum = numbers.reduce((acc, num) => acc + (num % 10), 0);

    if (+value[10] !== sum % 10) {
      return { peselFormat: false };
    }

    return null;
  };

export const getErrorMsg = (controlName: string, form: FormGroup) => {
  const control = form.get(controlName);

  if (control?.invalid && control?.errors && control?.touched) {
    const firstErrorKey: string = Object.keys(control.errors)[0];

    switch (firstErrorKey) {
      case 'required':
        return 'To pole jest wymagane.';
      case 'maxlength':
        return `Wprowadzona wartość ma zbyt wiele znaków.`;
      case 'minlength':
        return `Wprowadzona wartość ma za mało znaków.`;
      case 'pattern':
        return 'Nieprawidłowy format wprowadzonych danych.';
      case 'peselFormat':
        return 'Podany pesel jest niepoprawny.';
      default:
        return 'Błąd walidacji.';
    }
  }

  return '';
};
