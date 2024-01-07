import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PatientsService } from '../../service/patients.service';
import { PatientsPageComponent } from './patients-page.component';
import { FilterComponent } from '../../../shared/component/filter/filter.component';
import { SortComponent } from '../../../shared/component/sort/sort.component';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import { PersonalDetails } from '../../model/PersonalDetails';

describe('PatientsPageComponent', () => {
  let component: PatientsPageComponent;
  let fixture: ComponentFixture<PatientsPageComponent>;

  const mockedPersonalDetails: PersonalDetails[] = [
    {
      id: 1,
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
    },
    {
      id: 2,
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
          pesel: '12345678978',
          birthDate: '11.11.2020',
          lastName: 'Kościuszko',
          firstName: 'Tadeusz',
        },
        fotoUrl: 'https://zdjecia/zdjecie.jpg',
      },
    },
    {
      id: 3,
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
          lastName: 'Mickiewicz',
          firstName: 'Adam',
        },
        fotoUrl: 'https://zdjecia/zdjecie.jpg',
      },
    },
  ];

  const patientServiceMock = {
    navigateToSelectedPatient: jasmine.createSpy('navigateToSelectedPatient'),
    sortByParamWithDefaultOption: jasmine.createSpy('sortByParamWithDefaultOption').and.returnValue(mockedPersonalDetails),
    getFilteredPatients: jasmine.createSpy('getFilteredPatients').and.returnValue(mockedPersonalDetails),
    getMappedCardConfig: jasmine.createSpy('getMappedCardConfig'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsPageComponent, FilterComponent, SortComponent, PatientCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: mockedPersonalDetails,
              },
            },
            queryParams: of({}),
          },
        },
        { provide: PatientsService, useValue: patientServiceMock },
      ],
    });

    fixture = TestBed.createComponent(PatientsPageComponent);
    component = fixture.componentInstance;
  });

  it('should initialize personalDetails from route data', () => {
    // when
    component.ngOnInit();

    // then
    expect(component.personalDetails).toEqual(mockedPersonalDetails);
  });

  it('should navigate to selected patient', () => {
    // given
    const pesel = '123456789';

    // when
    component.navigateToSelectedPatient(pesel);

    // then
    expect(patientServiceMock.navigateToSelectedPatient).toHaveBeenCalledWith(pesel);
  });

  afterEach(() => {
    patientServiceMock.navigateToSelectedPatient.calls.reset();
    patientServiceMock.getFilteredPatients.calls.reset();
    patientServiceMock.sortByParamWithDefaultOption.calls?.reset();
    patientServiceMock.getMappedCardConfig.calls.reset();
  });
});
