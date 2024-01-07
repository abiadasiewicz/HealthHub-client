import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsPageComponent } from './patient-details-page.component';
import { PatientEditFormComponent } from '../patient-edit-form/patient-edit-form.component';
import { BorderedFieldComponent } from '../../../shared/component/bordered-field/bordered-field.component';
import { InputComponent } from '../../../shared/component/input/input.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PatientData } from '../../model/PatientData';
import { PersonalDetails } from '../../model/PersonalDetails';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('PatientsDetailsPageComponent', () => {
  let component: PatientDetailsPageComponent;
  let fixture: ComponentFixture<PatientDetailsPageComponent>;

  const mockedData: PersonalDetails = {
    id: 73,
    patientData: {
      personalData: {
        pesel: '12345678901',
        birthDate: '11-01-1757',
        lastName: 'Hamilton',
        firstName: 'Alexander',
      },
    } as PatientData,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, ReactiveFormsModule],
      declarations: [PatientDetailsPageComponent, PatientEditFormComponent, BorderedFieldComponent, InputComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: of(mockedData),
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PatientDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit output event from child', () => {
    // given
    const childComponent: PatientEditFormComponent = fixture.debugElement.query(By.directive(PatientEditFormComponent))
      .componentInstance as PatientEditFormComponent;

    // when
    childComponent.isDirty.emit(true);
    fixture.detectChanges();

    // then
    expect(component.isDirty).toEqual(true);
  });
});
