import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'as-filter-element',
  templateUrl: './filter-element.component.html',
  styleUrls: ['./filter-element.component.scss'],
})
export class FilterElementComponent {
  @Input({ required: true })
  label: string | undefined;

  @Input()
  controlName!: string | number | null;

  @Input()
  group!: FormGroup;
}
