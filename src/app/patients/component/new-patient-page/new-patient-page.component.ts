import { Component } from '@angular/core';

@Component({
  selector: 'as-new-patient-page',
  templateUrl: './new-patient-page.component.html',
  styleUrls: ['./new-patient-page.component.scss'],
})
export class NewPatientPageComponent {
  isDirty!: boolean;

  handleDirtyForm(event: boolean): void {
    this.isDirty = event;
  }
}
