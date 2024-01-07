import { PatientData } from './PatientData';

export interface PersonalDetails {
  id: number;
  patientData: PatientData;
  nextVisit?: string;
}

export type PersonalDetailsToSave = Omit<PersonalDetails, 'id' | 'nextVisit'>;
