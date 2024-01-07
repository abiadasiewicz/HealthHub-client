import { Injectable } from '@angular/core';
import { PersonalDetails } from '../model/PersonalDetails';
import { CardConfig } from '../model/CardConfig';
import { formatISODate } from '../../utils/date-util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  cardConfig: CardConfig[] = [];

  constructor(private router: Router) {}

  sortByParamWithDefaultOption(params: SortParams) {
    let sortField = params.sortAsc ?? params.sortDesc;
    let asc: boolean;
    if (!sortField) {
      sortField = 'lastName';
      asc = true;
    } else {
      asc = !!params?.sortAsc;
    }
    return { sortField, asc };
  }

  getMappedCardConfig(personalDetails: PersonalDetails[]): CardConfig[] {
    return personalDetails.map((card) => ({
      id: card.id,
      fotoUrl: card.patientData?.fotoUrl,
      firstName: card.patientData.personalData.firstName,
      lastName: card.patientData.personalData.lastName,
      birthDate: card.patientData.personalData.birthDate,
      phone: card.patientData.contact.phoneNr,
      pesel: card.patientData.personalData.pesel,
      nextVisit: card.nextVisit,
    }));
  }

  getFilteredPatients(lastName: string, birthDate: string, pesel: string, phone: string, personalDetails: PersonalDetails[]): CardConfig[] {
    this.cardConfig = this.getMappedCardConfig(personalDetails);

    if (lastName) {
      this.filterCardConfigBy((value) => value.lastName.toLowerCase().includes(lastName.toLowerCase()));
    }
    if (birthDate) {
      this.filterCardConfigBy((value) => formatISODate(value.birthDate) === birthDate);
    }
    if (pesel) {
      this.filterCardConfigBy((value) => value.pesel.startsWith(pesel));
    }
    if (phone) {
      this.filterCardConfigBy((value) => value.phone.replace(/\s/g, '') === phone);
    }

    return this.cardConfig;
  }

  navigateToSelectedPatient(id: number): void {
    void this.router.navigate([`patients/details/${id}`]);
  }

  private filterCardConfigBy(filterFn: (value: CardConfig) => boolean): void {
    this.cardConfig = this.cardConfig.filter(filterFn);
  }
}

export interface SortParams {
  sortAsc?: string;
  sortDesc?: string;
}
