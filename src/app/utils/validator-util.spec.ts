import { getErrorMsg, peselValidator } from './validator-util';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

describe('Validator', () => {
  describe('pesel validator', () => {
    it('should not return error when given pesel is correct', () => {
      // given
      const pesel = '46020411581';
      const control = new UntypedFormControl();

      // when
      control.setValue(pesel);
      const error = peselValidator()(control);

      // then
      expect(error).toEqual(null);
    });

    it('should return peselFormat error when given pesel is correct', () => {
      // given
      const pesel = '12345678911';
      const control = new UntypedFormControl();

      // when
      control.setValue(pesel);
      const error = peselValidator()(control);

      // then
      expect(error).toEqual({ peselFormat: false });
    });
  });

  describe('getErrorMsg', () => {
    let form: FormGroup;

    beforeEach(() => {
      const formBuilder = new FormBuilder();
      form = formBuilder.group({
        required: ['', Validators.required.bind(Validators)],
        maxlength: ['', Validators.maxLength(2)],
        minlength: ['', Validators.minLength(10)],
        pattern: ['', Validators.pattern(/^\d+$/)],
        peselFormat: ['', peselValidator()],
        another: ['', Validators.min(5)],
        noErrors: [''],
      });
    });

    it('should return proper errorMsg depending on error key', () => {
      // given
      const testData: { fieldName: string; value: string | number; expectedResult: string }[] = [
        {
          fieldName: 'required',
          value: '',
          expectedResult: 'To pole jest wymagane.',
        },
        {
          fieldName: 'maxlength',
          value: 'toolongvalue',
          expectedResult: 'Wprowadzona wartość ma zbyt wiele znaków.',
        },
        {
          fieldName: 'minlength',
          value: 'shortval',
          expectedResult: 'Wprowadzona wartość ma za mało znaków.',
        },
        {
          fieldName: 'pattern',
          value: 'value',
          expectedResult: 'Nieprawidłowy format wprowadzonych danych.',
        },
        {
          fieldName: 'peselFormat',
          value: '12345679812',
          expectedResult: 'Podany pesel jest niepoprawny.',
        },
        {
          fieldName: 'another',
          value: 2,
          expectedResult: 'Błąd walidacji.',
        },
        {
          fieldName: 'noErrors',
          value: '',
          expectedResult: '',
        },
      ];

      testData.forEach((data) => {
        // when
        form.controls[data.fieldName].setValue(data.value);
        form.controls[data.fieldName].markAsTouched();

        // then
        expect(getErrorMsg(data.fieldName, form)).toEqual(data.expectedResult);
      });
    });
  });
});
