import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortComponent } from './sort.component';
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [SortComponent, SortButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: of({}),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
  });

  it('should handle button clicked event and reset other buttons', () => {
    // given
    const firstNameButton = createSortButtonComponent('Imię');
    const lastNameButton = createSortButtonComponent('Nazwisko');
    const peselButton = createSortButtonComponent('PESEL');
    const phoneButton = createSortButtonComponent('Telefon');

    component.sortButtons = new QueryList<SortButtonComponent>();
    component.sortButtons?.reset([firstNameButton, lastNameButton, peselButton, phoneButton]);

    // when
    lastNameButton.clicked = true;
    component.handleButtonClicked('Nazwisko');

    // then
    expect(firstNameButton.clicked).toBe(false);
    expect(firstNameButton.sortAsc).toBe(false);
    expect(firstNameButton.sortDesc).toBe(true);

    expect(lastNameButton.clicked).toBe(true);
    expect(lastNameButton.sortAsc).toBe(undefined);
    expect(lastNameButton.sortDesc).toBe(undefined);

    expect(peselButton.clicked).toBe(false);
    expect(peselButton.sortAsc).toBe(false);
    expect(peselButton.sortDesc).toBe(true);

    expect(phoneButton.clicked).toBe(false);
    expect(phoneButton.sortAsc).toBe(false);
    expect(phoneButton.sortDesc).toBe(true);
  });
});

const createSortButtonComponent = (value: string): SortButtonComponent => {
  const fixture = TestBed.createComponent(SortButtonComponent);
  const component = fixture.componentInstance;
  component.value = value;
  fixture.detectChanges();
  return component;
};
