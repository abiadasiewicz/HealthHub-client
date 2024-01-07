import { ResolveFn } from '@angular/router';
import { PersonalDetails } from '../model/PersonalDetails';
import { inject } from '@angular/core';
import { PatientsApiService } from '../service/patients-api.service';

export const patientsPageResolver: ResolveFn<PersonalDetails[]> = () => {
  const patientApiService = inject(PatientsApiService);
  return patientApiService.getAllPatients();
};
