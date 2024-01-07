import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'as-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
})
export class SortButtonComponent {
  @Input({ required: true })
  value!: string;

  @Output()
  buttonClicked = new EventEmitter<string>();

  sortAsc: boolean | undefined;

  clicked = false;

  sortDesc: boolean | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  sortByFieldAsc(field: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortAsc: field, sortDesc: null },
      queryParamsHandling: 'merge',
    });
  }

  sortByFieldDesc(field: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortDesc: field, sortAsc: null },
      queryParamsHandling: 'merge',
    });
  }

  resetSorting(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortDesc: null, sortAsc: null },
      queryParamsHandling: 'merge',
    });
  }

  toggleButton() {
    if (!this.clicked) {
      this.clicked = true;
      this.sortAsc = true;
      this.sortDesc = false;
      this.sortByFieldAsc(this.value);
    } else if (this.sortAsc) {
      this.sortAsc = false;
      this.sortDesc = true;
      this.sortByFieldDesc(this.value);
    } else if (this.sortDesc) {
      this.sortAsc = false;
      this.sortDesc = false;
      this.clicked = false;
      this.resetSorting();
    }
    this.buttonClicked.emit(this.value);
  }
}
