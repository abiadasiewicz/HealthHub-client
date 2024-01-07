import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataKeys, translateKeysToEng } from '../../../utils/translate-util';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { getErrorMsg } from '../../../utils/validator-util';

@Component({
  selector: 'as-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  filterOptions: DataKeys[] = ['Nazwisko', 'Data urodzenia', 'PESEL', 'Nr telefonu'];

  lastName = '';

  birthDate = '';

  pesel = '';

  phone = '';

  protected readonly translateSortingValuesToEng = translateKeysToEng;

  private readonly DATE_REGEX = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

  private readonly ONLY_NUMBER_REGEX = /^\d+$/;

  filterForm = new FormGroup({
    lastName: new FormControl<string>('', [Validators.maxLength(120)]),
    birthDate: new FormControl<string>('', [Validators.pattern(this.DATE_REGEX)]),
    pesel: new FormControl<string>('', [Validators.maxLength(11), Validators.pattern(this.ONLY_NUMBER_REGEX)]),
    phone: new FormControl<string>('', [Validators.maxLength(9), Validators.min(9), Validators.pattern(this.ONLY_NUMBER_REGEX)]),
    clearForm: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { pesel, phone, lastName, birthDate } = params;
      this.lastName = <string>lastName;
      this.birthDate = <string>birthDate;
      this.pesel = <string>pesel;
      this.phone = <string>phone;
    });
    this.filterForm.valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$)).subscribe((formData) => {
      if (this.filterForm.valid) {
        void this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { lastName: formData.lastName, birthDate: formData.birthDate, pesel: formData.pesel, phone: formData.phone },
          queryParamsHandling: 'merge',
        });
      }
    });
    this.setFormData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearForm() {
    this.filterForm.reset();
  }

  private setFormData() {
    this.filterForm.patchValue({
      clearForm: '',
      lastName: this.lastName,
      birthDate: this.birthDate,
      pesel: this.pesel,
      phone: this.phone,
    });
  }

  protected readonly getErrorMsg = getErrorMsg;
}
