import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FilterComponent } from './filter.component';
import { InputComponent } from '../input/input.component';

describe('MyComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent, InputComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ lastName: 'Mickiewicz', birthDate: '01.01.1990', pesel: '1234567890', phone: '123456789' }),
            queryParamsHandling: 'merge',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should set form data on ngOnInit', fakeAsync(() => {
    // when
    component.ngOnInit();
    tick();
    flush();
    discardPeriodicTasks();
    fixture.detectChanges();

    // then
    expect(component.lastName).toEqual('Mickiewicz');
    expect(component.birthDate).toEqual('01.01.1990');
    expect(component.pesel).toEqual('1234567890');
    expect(component.phone).toEqual('123456789');
  }));

  it('should navigate when form is valid', async () => {
    // given
    const rotuerSpy = spyOn(router, 'navigate');
    // when
    component.ngOnInit();
    fixture.detectChanges();

    component.filterForm.setValue({
      lastName: 'Mieszko',
      birthDate: '12.12.2000',
      pesel: '0987654321',
      phone: '987654321',
      clearForm: '',
    });

    component.filterForm.updateValueAndValidity();
    await fixture.whenStable();
    fixture.detectChanges();

    // then
    expect(rotuerSpy).toHaveBeenCalledWith([], {
      relativeTo: activatedRoute,
      queryParams: {
        lastName: 'Mieszko',
        birthDate: '12.12.2000',
        pesel: '0987654321',
        phone: '987654321',
      },
      queryParamsHandling: 'merge',
    });
  });

  it('should clear form on clear button click', async () => {
    component.ngOnInit();
    fixture.detectChanges();
    // given
    element = fixture.debugElement.nativeElement as HTMLElement;
    const clearButton: HTMLButtonElement = element.querySelector('button.btn-transparent') as HTMLButtonElement;

    // when
    clearButton.click();
    component.filterForm.updateValueAndValidity();
    await fixture.whenStable();
    fixture.detectChanges();

    // then;
    expect(component.filterForm.get('lastName')?.value).toBeNull();
    expect(component.filterForm.get('birthDate')?.value).toBeNull();
    expect(component.filterForm.get('pesel')?.value).toBeNull();
    expect(component.filterForm.get('phone')?.value).toBeNull();
  });
});
