import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewPatientPageComponent } from './new-patient-page.component';
import { PatientEditFormComponent } from '../patient-edit-form/patient-edit-form.component';
import { BorderedFieldComponent } from '../../../shared/component/bordered-field/bordered-field.component';
import { InputComponent } from '../../../shared/component/input/input.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewPatientPageComponent', () => {
  let component: NewPatientPageComponent;
  let fixture: ComponentFixture<NewPatientPageComponent>;

  const activatedRouteMock = {
    paramMap: of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, ReactiveFormsModule],
      declarations: [NewPatientPageComponent, PatientEditFormComponent, BorderedFieldComponent, InputComponent],
      providers: [HttpClient, HttpHandler, { provide: ActivatedRoute, useValue: activatedRouteMock }],
    });
    fixture = TestBed.createComponent(NewPatientPageComponent);
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

  it('should change isDirty property on handleDirtyForm call', () => {
    // when
    component.handleDirtyForm(true);

    // then
    expect(component.isDirty).toEqual(true);

    // when
    component.handleDirtyForm(false);

    // then
    expect(component.isDirty).toEqual(false);
  });
});
