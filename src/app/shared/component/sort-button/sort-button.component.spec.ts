import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SortButtonComponent } from './sort-button.component';
import Spy = jasmine.Spy;

describe('SortButtonComponent', () => {
  let component: SortButtonComponent;
  let fixture: ComponentFixture<SortButtonComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let buttonClickedSpy: Spy;
  let navigateSpy: Spy;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [SortButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SortButtonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    buttonClickedSpy = spyOn(component.buttonClicked, 'emit');
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should emit buttonClicked event and toggle values when toggleButton is called and clicked = false', () => {
    // given
    component.clicked = false;

    // when
    component.toggleButton();

    // then
    expect(buttonClickedSpy).toHaveBeenCalledWith(component.value);
    expect(component.clicked).toBeTrue();
    expect(component.sortDesc).toBeFalse();
    expect(component.sortAsc).toBeTrue();
  });

  it('should emit buttonClicked event and toggle values when toggleButton is called and sortAsc = true', () => {
    // given
    component.clicked = true;
    component.sortAsc = true;

    // when
    component.toggleButton();

    // then
    expect(buttonClickedSpy).toHaveBeenCalledWith(component.value);
    expect(component.sortAsc).toBeFalse();
    expect(component.sortDesc).toBeTrue();
  });

  it('should emit buttonClicked event and toggle values when toggleButton is called and sortDesc = true', () => {
    // given
    const resetSortingSpy = spyOn(component, 'resetSorting');
    component.clicked = true;
    component.sortAsc = false;
    component.sortDesc = true;

    // when
    component.toggleButton();

    // then
    expect(buttonClickedSpy).toHaveBeenCalledWith(component.value);
    expect(component.sortDesc).toBeFalse();
    expect(component.sortAsc).toBeFalse();
    expect(component.clicked).toBeFalse();
    expect(resetSortingSpy).toHaveBeenCalled();
  });

  it('should navigate with queryParams for descending sorting when sortDesc is called', () => {
    // given
    component.sortByFieldDesc('fieldName');

    // when then
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { sortDesc: 'fieldName', sortAsc: null },
      queryParamsHandling: 'merge',
    });
  });

  it('should navigate with queryParams for ascending sorting when sortAsc is called', () => {
    // given
    component.sortByFieldAsc('fieldName');

    // when then
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { sortAsc: 'fieldName', sortDesc: null },
      queryParamsHandling: 'merge',
    });
  });

  it('should reset route on resetSorting', () => {
    // when
    component.resetSorting();

    // when then
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { sortDesc: null, sortAsc: null },
      queryParamsHandling: 'merge',
    });
  });
});
