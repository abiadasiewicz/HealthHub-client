import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'as-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  label!: string;

  @Input()
  controlName!: string;

  @Input()
  inputType!: string;

  @Input()
  required = false;

  @Input()
  errorMsg!: string;

  @Input()
  group!: FormGroup;

  @Input()
  isRequired = false;
}
