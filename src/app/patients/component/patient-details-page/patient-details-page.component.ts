import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalDetails } from '../../model/PersonalDetails';

@Component({
  selector: 'as-patient-details-page',
  templateUrl: './patient-details-page.component.html',
  styleUrls: ['./patient-details-page.component.scss'],
})
export class PatientDetailsPageComponent {
  patientData: PersonalDetails;

  isDirty: boolean | undefined;

  constructor(private route: ActivatedRoute) {
    this.patientData = <PersonalDetails>this.route.snapshot.data['data'];
  }

  handleDirtyForm(event: boolean): void {
    this.isDirty = event;
  }
}
