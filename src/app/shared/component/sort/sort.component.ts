import { Component, QueryList, ViewChildren } from '@angular/core';
import { SortButtonComponent } from '../sort-button/sort-button.component';

@Component({
  selector: 'as-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  sortedValues: SortConfig[] = ['Imię', 'Nazwisko', 'PESEL'];

  @ViewChildren(SortButtonComponent) sortButtons: QueryList<SortButtonComponent> | undefined;

  handleButtonClicked(clickedValue: string) {
    this.sortedValues.forEach((value) => {
      if (value !== clickedValue) {
        const buttonToReset = this.sortButtons?.find((button: { value: string }) => button.value === value);
        if (buttonToReset) {
          buttonToReset.clicked = false;
          buttonToReset.sortAsc = false;
          buttonToReset.sortDesc = true;
        }
      }
    });
  }
}

type SortConfig = 'Imię' | 'Nazwisko' | 'PESEL';
