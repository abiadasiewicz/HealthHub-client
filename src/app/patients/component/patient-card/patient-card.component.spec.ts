import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardComponent } from './patient-card.component';

describe('CardComponent', () => {
  let component: PatientCardComponent;
  let fixture: ComponentFixture<PatientCardComponent>;
  let element: HTMLElement;

  const selectors = {
    img: 'img',
    name: 'h5.name',
    birthdate: 'p.birthdate span',
    phoneNr: 'p.phone-nr span',
    pesel: 'p.pesel span',
    nextVisitTime: 'p.time',
    nextVisitDay: 'p.day',
    withoutVisit: 'p.witoutVisit',
    bigPlus: 'div.bigPlus i',
    dateContainer: 'div.date-container',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCardComponent],
    });
    fixture = TestBed.createComponent(PatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component with filled up data', () => {
    // given
    element = fixture.debugElement.nativeElement as HTMLElement;
    component.cardConfig = {
      pesel: '12345678901',
      birthDate: '11-01-1757',
      lastName: 'Hamilton',
      firstName: 'Alexander',
      fotoUrl: 'url',
      nextVisit: '2023-11-10 12:30',
      phone: '123456789',
    };

    // when
    component.ngOnInit();
    fixture.detectChanges();

    // then
    expect(element.querySelector(selectors.name)?.textContent).toBe('Alexander Hamilton');
    expect(element.querySelector(selectors.birthdate)?.textContent).toBe('11.01.1757');
    expect(element.querySelector(selectors.phoneNr)?.textContent).toBe('123 456 789');
    expect(element.querySelector(selectors.pesel)?.textContent).toBe('12345678901');
    expect(element.querySelector(selectors.nextVisitTime)?.textContent).toBe('12:30');
    expect(element.querySelector(selectors.nextVisitDay)?.textContent).toBe('10.11');
    expect(element.querySelector(selectors.img)).toBeTruthy();
    expect(element.querySelector(selectors.bigPlus)).not.toBeTruthy();
    expect(element.querySelector(selectors.withoutVisit)).not.toBeTruthy();
  });

  it('should create component with filled up data without next visit', () => {
    // given
    element = fixture.debugElement.nativeElement as HTMLElement;
    component.cardConfig = {
      pesel: '12345678901',
      birthDate: '11-01-1757',
      lastName: 'Hamilton',
      firstName: 'Alexander',
      fotoUrl: 'url',
      phone: '123456789',
    };

    // when
    component.ngOnInit();
    fixture.detectChanges();

    // then
    expect(element.querySelector(selectors.name)?.textContent).toBe('Alexander Hamilton');
    expect(element.querySelector(selectors.birthdate)?.textContent).toBe('11.01.1757');
    expect(element.querySelector(selectors.phoneNr)?.textContent).toBe('123 456 789');
    expect(element.querySelector(selectors.pesel)?.textContent).toBe('12345678901');
    expect(element.querySelector(selectors.dateContainer)).not.toBeTruthy();
    expect(element.querySelector(selectors.img)).toBeTruthy();
    expect(element.querySelector(selectors.bigPlus)).not.toBeTruthy();
    expect(element.querySelector(selectors.withoutVisit)).toBeTruthy();
  });

  it('should create component with BigPlus', () => {
    // given
    element = fixture.debugElement.nativeElement as HTMLElement;
    component.emptyCard = true;

    // when
    component.ngOnInit();
    fixture.detectChanges();

    // then
    expect(element.querySelector(selectors.name)).not.toBeTruthy();
    expect(element.querySelector(selectors.birthdate)).not.toBeTruthy();
    expect(element.querySelector(selectors.phoneNr)).not.toBeTruthy();
    expect(element.querySelector(selectors.pesel)).not.toBeTruthy();
    expect(element.querySelector(selectors.dateContainer)).not.toBeTruthy();
    expect(element.querySelector(selectors.img)).not.toBeTruthy();
    expect(element.querySelector(selectors.withoutVisit)).not.toBeTruthy();
    expect(element.querySelector(selectors.bigPlus)).toBeTruthy();
  });
});
