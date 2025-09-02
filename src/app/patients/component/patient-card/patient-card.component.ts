import { Component, Input, OnInit } from '@angular/core';
import { formatISODate, mapDate, splitDate } from '../../../utils/date-util';
import { CardConfig } from '../../model/CardConfig';
import { formatPhoneNr } from '../../../utils/phone-util';
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";

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

  ngOnInit() {
    const nextVisit = this.cardConfig?.nextVisit;
    if (nextVisit) {
      this.time = dayjs(nextVisit).hour().toString() + ':' + dayjs(nextVisit).minute().toString();
      this.day = dayjs(nextVisit).format('DD.MM');
    }
  }

  formatDate(date: string | undefined): string {
    return dayjs(date).format('DD.MM.YYYY');
  }

  protected readonly formatPhoneNr = formatPhoneNr;
}
