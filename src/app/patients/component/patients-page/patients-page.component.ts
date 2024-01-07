import { Component, OnDestroy, OnInit } from '@angular/core';
import { sortByField } from '../../../utils/sort-util';
import { CardConfig } from '../../model/CardConfig';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../service/patients.service';
import { DataKeys, translateKeysToEng } from '../../../utils/translate-util';
import { Subject, takeUntil } from 'rxjs';
import { PersonalDetails } from '../../model/PersonalDetails';

@Component({
  selector: 'as-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss'],
})
export class PatientsPageComponent implements OnInit, OnDestroy {
  personalDetails: PersonalDetails[] = [];

  cardConfig: CardConfig[] = [];

  destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private patientsSerivce: PatientsService,
  ) {}

  ngOnInit() {
    this.personalDetails = <PersonalDetails[]>this.route.snapshot.data['data'];
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { sortField, asc } = this.patientsSerivce.sortByParamWithDefaultOption(params);
      const { lastName, birthDate, pesel, phone } = params;
      this.getCardsConfig();
      this.cardConfig = this.patientsSerivce.getFilteredPatients(
        <string>lastName,
        <string>birthDate,
        <string>pesel,
        <string>phone,
        this.personalDetails,
      );
      this.cardConfig = sortByField(this.cardConfig, translateKeysToEng(sortField as DataKeys) as keyof CardConfig, asc);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToSelectedPatient(id: number) {
    this.patientsSerivce.navigateToSelectedPatient(id);
  }

  private getCardsConfig() {
    this.cardConfig = this.patientsSerivce.getMappedCardConfig(this.personalDetails);
  }
}
