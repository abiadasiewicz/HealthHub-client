import { inject } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { PatientsApiService } from '../service/patients-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PersonalDetails } from '../model/PersonalDetails';

export const patientDetailsResolver: (route: ActivatedRouteSnapshot) => Observable<null | PersonalDetails> = (route) => {
  const id = Number(route.paramMap.get('id'));

  const apiService = inject(PatientsApiService);
  return apiService.getAllPatients().pipe(
    switchMap((details) => {
      const patient = details.find((patient) => patient.id === id);
      return of(patient ?? null);
    }),
    catchError((error) => {
      console.error('Error:', error);
      return of(null);
    }),
  );
};
