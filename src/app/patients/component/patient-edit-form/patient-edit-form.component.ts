import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatISODate } from '../../../utils/date-util';
import { Router } from '@angular/router';
import { getErrorMsg, peselValidator } from '../../../utils/validator-util';
import { PersonalDetails } from '../../model/PersonalDetails';
import { PatientsApiService } from '../../service/patients-api.service';
import { Subject, takeUntil } from 'rxjs';
import { PatientsService } from '../../service/patients.service';

@Component({
  selector: 'as-patient-edit-form',
  templateUrl: './patient-edit-form.component.html',
  styleUrls: ['./patient-edit-form.component.scss'],
})
export class PatientEditFormComponent implements OnInit, OnDestroy {
  @Input()
  personalDetails: PersonalDetails | undefined;

  @Input()
  editModeOnStart = false;

  @Output()
  isDirty = new EventEmitter<boolean>();

  destroy$ = new Subject<void>();

  editMode = false;

  patientForm: FormGroup;

  protected readonly getErrorMsg = getErrorMsg;

  private readonly DATE_REGEX = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

  private readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

  private readonly URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  private readonly ONLY_NUMBER_REGEX = /^\d+$/;

  /**
   * Validators.required.bind(Validators) -> Workaround na błąd esLint:
   * Avoid referencing unbound methods which may cause unintentional scoping of `this`.
   * If your function does not access `this`, you can annotate it with `this: void`, or consider using an arrow function instead @typescript-eslint/unbound-method
   */
  constructor(
    private router: Router,
    private patientsApiService: PatientsApiService,
    private patientsService: PatientsService,
  ) {
    this.patientForm = new FormGroup({
      firstName: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(120)]),
      lastName: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(120)]),
      birthDate: new FormControl<string>('', [Validators.required.bind(Validators), Validators.pattern(this.DATE_REGEX)]),
      pesel: new FormControl<string>('', [
        Validators.required.bind(Validators),
        Validators.maxLength(11),
        Validators.minLength(11),
        peselValidator(),
      ]),
      street: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(250)]),
      city: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(60)]),
      postcode: new FormControl<string>('', Validators.required.bind(Validators)),
      country: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(60)]),
      province: new FormControl<string>('', [Validators.required.bind(Validators), Validators.maxLength(60)]),
      fotoUrl: new FormControl<string>('', [Validators.required.bind(Validators), Validators.pattern(this.URL_REGEX)]),
      phoneNr: new FormControl<string>('', [Validators.maxLength(9), Validators.minLength(9), Validators.pattern(this.ONLY_NUMBER_REGEX)]),
      email: new FormControl<string>('', Validators.pattern(this.EMAIL_REGEX)),
    });
  }

  ngOnInit() {
    this.editModeOnStart ? this.patientForm.enable() : this.patientForm.disable();
    this.editMode = this.editModeOnStart;
    this.setFormData();
    this.patientForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isDirty.emit(this.patientForm.dirty);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  enableEdit() {
    this.patientForm.enable();
    this.editMode = true;
    this.patientForm.markAllAsTouched();
    this.patientForm.updateValueAndValidity();
  }

  cancel() {
    if (this.editModeOnStart) {
      void this.router.navigate(['/patients']);
    }
    this.setFormData();
    this.patientForm.markAsPristine();
    this.patientForm.disable();
    this.editMode = false;
  }

  submit() {
    this.patientForm.markAsPristine();
    const collectedData = this.collectFormData();
    if (this.editModeOnStart) {
      this.patientsApiService
        .addPatient(collectedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.patientsService.navigateToSelectedPatient(collectedData.id);
        });
    } else if (this.personalDetails?.id) {
      this.patientsApiService
        .updatePatient(this.personalDetails.id, collectedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.patientsService.navigateToSelectedPatient(collectedData.id);
        });
    }
    this.patientForm.disable();
    this.editMode = false;
  }

  private setFormData(): void {
    if (this.personalDetails) {
      this.patientForm.patchValue({
        firstName: this.personalDetails?.patientData?.personalData?.firstName ?? null,
        lastName: this.personalDetails?.patientData?.personalData?.lastName ?? null,
        birthDate: formatISODate(this.personalDetails?.patientData?.personalData?.birthDate) ?? null,
        pesel: this.personalDetails?.patientData?.personalData?.pesel ?? null,
        street: this.personalDetails?.patientData?.address?.street ?? null,
        city: this.personalDetails?.patientData?.address?.city ?? null,
        postcode: this.personalDetails?.patientData?.address?.postcode ?? null,
        country: this.personalDetails?.patientData?.address?.country ?? null,
        province: this.personalDetails?.patientData?.address?.province ?? null,
        phoneNr: this.personalDetails?.patientData?.contact?.phoneNr ?? null,
        email: this.personalDetails?.patientData?.contact?.email ?? null,
        fotoUrl: this.personalDetails?.patientData?.fotoUrl ?? null,
      });
    }
  }

  private collectFormData(): PersonalDetails {
    this.isDirty.emit(this.patientForm.dirty);
    return {
      patientData: {
        personalData: {
          firstName: <string>this.patientForm.get('firstName')?.value,
          lastName: <string>this.patientForm.get('lastName')?.value,
          pesel: <string>this.patientForm.get('pesel')?.value,
          birthDate: <string>this.patientForm.get('birthDate')?.value,
        },
        fotoUrl: <string>this.patientForm.get('fotoUrl')?.value,
        contact: {
          email: <string>this.patientForm.get('email')?.value,
          phoneNr: <string>this.patientForm.get('phoneNr')?.value,
        },
        address: {
          city: <string>this.patientForm.get('city')?.value,
          country: <string>this.patientForm.get('country')?.value,
          street: <string>this.patientForm.get('street')?.value,
          province: <string>this.patientForm.get('province')?.value,
          postcode: <string>this.patientForm.get('postcode')?.value,
        },
      },
    } as PersonalDetails;
  }
}
