import { Component, Input, OnInit } from '@angular/core';
import { formatISODate, mapDate, splitDate } from '../../../utils/date-util';
import { CardConfig } from '../../model/CardConfig';
import { formatPhoneNr } from '../../../utils/phone-util';

@Component({
  selector: 'as-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit {
  @Input() cardConfig: CardConfig | undefined;

  @Input() emptyCard = false;

  day: string | undefined;

  time: string | undefined;

  protected readonly formatISODate = formatISODate;

  ngOnInit() {
    const nextVisit = this.cardConfig?.nextVisit;
    if (nextVisit) {
      const splittedDate = splitDate(nextVisit);
      this.time = splittedDate.time;
      this.day = mapDate(splittedDate.day);
    }
  }

  protected readonly formatPhoneNr = formatPhoneNr;
}
