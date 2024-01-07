import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsPageComponent } from './patients/component/patients-page/patients-page.component';
import { PatientDetailsPageComponent } from './patients/component/patient-details-page/patient-details-page.component';
import { patientDetailsResolver } from './patients/resolver/patient-details.resolver';
import { NewPatientPageComponent } from './patients/component/new-patient-page/new-patient-page.component';
import { patientsPageResolver } from './patients/resolver/patients-page.resolver';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { unsavedChangesGuard } from './patients/guard/unsaved-changes.guard';
import { CalendarComponent } from './calendar-view/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full',
  },
  {
    path: 'patients',
    component: PatientsPageComponent,
    resolve: {
      data: patientsPageResolver,
    },
  },
  {
    path: 'patients/details/:id',
    component: PatientDetailsPageComponent,
    canDeactivate: [unsavedChangesGuard],
    resolve: {
      data: patientDetailsResolver,
    },
  },
  {
    path: 'patients/new',
    component: NewPatientPageComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
