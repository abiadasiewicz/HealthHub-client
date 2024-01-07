import { PatientDetailsPageComponent } from '../component/patient-details-page/patient-details-page.component';
import { NewPatientPageComponent } from '../component/new-patient-page/new-patient-page.component';

export const unsavedChangesGuard: (component: PatientDetailsPageComponent | NewPatientPageComponent) => boolean = (
  component: PatientDetailsPageComponent | NewPatientPageComponent,
) => {
  if (component.isDirty) {
    window.alert('Masz niezapisane zmiany kumpel');
    return false;
  }

  return true;
};
