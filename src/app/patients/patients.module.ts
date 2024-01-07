import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsPageComponent } from './component/patient-details-page/patient-details-page.component';
import { PatientEditFormComponent } from './component/patient-edit-form/patient-edit-form.component';
import { NewPatientPageComponent } from './component/new-patient-page/new-patient-page.component';
import { PatientCardComponent } from './component/patient-card/patient-card.component';
import { PatientsPageComponent } from './component/patients-page/patients-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PatientsPageComponent,
    PatientCardComponent,
    PatientDetailsPageComponent,
    PatientEditFormComponent,
    NewPatientPageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedModule],
  providers: [PatientDetailsPageComponent],
  exports: [PatientsPageComponent, PatientCardComponent, PatientDetailsPageComponent, PatientEditFormComponent, NewPatientPageComponent],
})
export class PatientsModule {}
