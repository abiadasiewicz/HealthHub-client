import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditFormComponent } from './patient-edit-form.component';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BorderedFieldComponent } from '../../../shared/component/bordered-field/bordered-field.component';
import { InputComponent } from '../../../shared/component/input/input.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PersonalDetails } from '../../model/PersonalDetails';
import { formatISODate } from '../../../utils/date-util';
import { PatientsApiService } from '../../service/patients-api.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientsService } from '../../service/patients.service';

describe('PatientEditPageComponent', () => {
  let component: PatientEditFormComponent;
  let fixture: ComponentFixture<PatientEditFormComponent>;

  const mockedPersonalDetails: PersonalDetails = {
    id: 73,
    patientData: {
      address: {
        city: 'Wrocław',
        street: 'Piękna',
        country: 'Polska',
        province: 'Dolnośląskie',
        postcode: '54-145',
      },
      contact: {
        phoneNr: '123456789',
        email: 'przykladowy.mail@gmail.com',
      },
      personalData: {
        pesel: '46020411581',
        birthDate: '11.11.2020',
        lastName: 'Przykładowy',
        firstName: 'Ziomek',
      },
      fotoUrl: 'https://zdjecia/zdjecie.jpg',
    },
  };

  const mockedPersonalDetailsToSave = {
    patientData: {
      address: {
        city: 'Wrocław',
        street: 'Piękna',
        country: 'Polska',
        province: 'Dolnośląskie',
        postcode: '54-145',
      },
      contact: {
        phoneNr: '123456789',
        email: 'przykladowy.mail@gmail.com',
      },
      personalData: {
        pesel: '46020411581',
        birthDate: '11.11.2020',
        lastName: 'Przykładowy',
        firstName: 'Ziomek',
      },
      fotoUrl: 'https://zdjecia/zdjecie.jpg',
    },
  };

  const patientApiServiceMock = {
    addPatient: jasmine.createSpy('addPatient').and.returnValue(of(mockedPersonalDetails)),
    updatePatient: jasmine.createSpy('updatePatient').and.returnValue(of(mockedPersonalDetails)),
  };

  const patientServiceMock = {
    navigateToSelectedPatient: jasmine.createSpy('navigateToPatientCard'),
  };

  describe('EditModeOnStart -> false', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterModule, ReactiveFormsModule, RouterTestingModule],
        declarations: [PatientEditFormComponent, BorderedFieldComponent, InputComponent],
        providers: [
          HttpClient,
          HttpHandler,
          {
            provide: PatientsApiService,
            useValue: patientApiServiceMock,
          },
          {
            provide: PatientsService,
            useValue: patientServiceMock,
          },
        ],
      });
      fixture = TestBed.createComponent(PatientEditFormComponent);
      component = fixture.componentInstance;
      component.personalDetails = mockedPersonalDetails;
      component.editModeOnStart = false;
      fixture.detectChanges();
    });

    it('should create component with filled up data and disabled form', () => {
      // then
      expect(component.editMode).toBeFalse();
      expect(component.patientForm.get('firstName')?.value).toEqual(mockedPersonalDetails.patientData.personalData.firstName);
      expect(component.patientForm.get('lastName')?.value).toEqual(mockedPersonalDetails.patientData.personalData.lastName);
      expect(component.patientForm.get('birthDate')?.value).toEqual(
        formatISODate(mockedPersonalDetails.patientData.personalData.birthDate),
      );
      expect(component.patientForm.get('pesel')?.value).toEqual(mockedPersonalDetails.patientData.personalData.pesel);
      expect(component.patientForm.get('street')?.value).toEqual(mockedPersonalDetails.patientData.address.street);
      expect(component.patientForm.get('postcode')?.value).toEqual(mockedPersonalDetails.patientData.address.postcode);
      expect(component.patientForm.get('country')?.value).toEqual(mockedPersonalDetails.patientData.address.country);
      expect(component.patientForm.get('province')?.value).toEqual(mockedPersonalDetails.patientData.address.province);
      expect(component.patientForm.get('city')?.value).toEqual(mockedPersonalDetails.patientData.address.city);
      expect(component.patientForm.get('phoneNr')?.value).toEqual(mockedPersonalDetails.patientData.contact.phoneNr);
      expect(component.patientForm.get('email')?.value).toEqual(mockedPersonalDetails.patientData.contact.email);
      expect(component.patientForm.get('fotoUrl')?.value).toEqual(mockedPersonalDetails.patientData.fotoUrl);
      expect(component.patientForm.disabled).toBeTrue();
    });

    it('should enable edit mode on enableEdit', () => {
      // when
      component.enableEdit();
      fixture.detectChanges();

      // then
      expect(component.editMode).toBeTrue();
      expect(component.patientForm.enabled).toBeTrue();
      expect(component.patientForm.touched).toBeTrue();
    });

    it('should disable edit mode on cancel', () => {
      // when
      component.cancel();
      fixture.detectChanges();

      // then
      expect(component.editMode).toBeFalse();
      expect(component.patientForm.disabled).toBeTrue();
      expect(component.patientForm.pristine).toBeTrue();
    });

    it('should call updatePatient from PatientApiService on submit', () => {
      // when
      component.submit();
      fixture.detectChanges();

      // then
      expect(component.editMode).toBeFalse();
      expect(component.patientForm.disabled).toBeTrue();
      expect(component.patientForm.pristine).toBeTrue();
      expect(patientApiServiceMock.updatePatient).toHaveBeenCalledWith(mockedPersonalDetails.id, mockedPersonalDetailsToSave);
      expect(patientServiceMock.navigateToSelectedPatient).toHaveBeenCalledWith(mockedPersonalDetailsToSave.patientData.personalData.pesel);
    });

    afterEach(() => {
      patientApiServiceMock.addPatient.calls.reset();
      patientApiServiceMock.updatePatient.calls.reset();
    });
  });

  describe('EditModeOnStart -> true', () => {
    let router: Router;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterModule, ReactiveFormsModule, RouterTestingModule],
        declarations: [PatientEditFormComponent, BorderedFieldComponent, InputComponent],
        providers: [
          HttpClient,
          HttpHandler,
          {
            provide: PatientsApiService,
            useValue: patientApiServiceMock,
          },
          {
            provide: PatientsService,
            useValue: patientServiceMock,
          },
        ],
      });
      fixture = TestBed.createComponent(PatientEditFormComponent);
      component = fixture.componentInstance;
      component.personalDetails = mockedPersonalDetails;
      router = TestBed.inject(Router);
      component.editModeOnStart = true;
      fixture.detectChanges();
    });

    it('should create component with filled up data and enabled form', () => {
      // then
      expect(component.editMode).toBeTrue();
      expect(component.patientForm.get('firstName')?.value).toEqual(mockedPersonalDetails.patientData.personalData.firstName);
      expect(component.patientForm.get('lastName')?.value).toEqual(mockedPersonalDetails.patientData.personalData.lastName);
      expect(component.patientForm.get('birthDate')?.value).toEqual(
        formatISODate(mockedPersonalDetails.patientData.personalData.birthDate),
      );
      expect(component.patientForm.get('pesel')?.value).toEqual(mockedPersonalDetails.patientData.personalData.pesel);
      expect(component.patientForm.get('street')?.value).toEqual(mockedPersonalDetails.patientData.address.street);
      expect(component.patientForm.get('postcode')?.value).toEqual(mockedPersonalDetails.patientData.address.postcode);
      expect(component.patientForm.get('country')?.value).toEqual(mockedPersonalDetails.patientData.address.country);
      expect(component.patientForm.get('province')?.value).toEqual(mockedPersonalDetails.patientData.address.province);
      expect(component.patientForm.get('city')?.value).toEqual(mockedPersonalDetails.patientData.address.city);
      expect(component.patientForm.get('phoneNr')?.value).toEqual(mockedPersonalDetails.patientData.contact.phoneNr);
      expect(component.patientForm.get('email')?.value).toEqual(mockedPersonalDetails.patientData.contact.email);
      expect(component.patientForm.get('fotoUrl')?.value).toEqual(mockedPersonalDetails.patientData.fotoUrl);
      expect(component.patientForm.enabled).toBeTrue();
    });

    it('should navigate to patients on cancel', () => {
      // given
      const spy = spyOn(router, 'navigate');

      // when
      component.cancel();
      fixture.detectChanges();

      // then
      expect(spy).toHaveBeenCalledWith(['/patients']);
    });
    it('should call add from PatientApiService on submit', () => {
      // when
      component.submit();
      fixture.detectChanges();

      // then
      expect(component.editMode).toBeFalse();
      expect(component.patientForm.disabled).toBeTrue();
      expect(component.patientForm.pristine).toBeTrue();
      expect(patientApiServiceMock.addPatient).toHaveBeenCalledWith(mockedPersonalDetailsToSave);
      expect(patientServiceMock.navigateToSelectedPatient).toHaveBeenCalledWith(mockedPersonalDetailsToSave.patientData.personalData.pesel);
    });

    afterEach(() => {
      patientApiServiceMock.addPatient.calls.reset();
      patientApiServiceMock.updatePatient.calls.reset();
    });
  });
});
