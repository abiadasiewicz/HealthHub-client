import { TestBed } from '@angular/core/testing';

import { PatientsService, SortParams } from './patients.service';
import { PersonalDetails } from '../model/PersonalDetails';
import { CardConfig } from '../model/CardConfig';
import { Router } from '@angular/router';

describe('PatientsService', () => {
  let service: PatientsService;
  let router: Router;

  const mockedPersonalDetails: PersonalDetails[] = [
    {
      id: 1,
      nextVisit: '2023-11-10 12:30',
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
          phoneNr: '356987412',
          email: 'przykladowy.mail@gmail.com',
        },
        personalData: {
          pesel: '51020411582',
          birthDate: '21.01.1867',
          lastName: 'Mickiewicz',
          firstName: 'Adam',
        },
        fotoUrl: 'https://zdjecia/zdjecie.jpg',
      },
    },
  ];

  const mockedCardConfig: CardConfig[] = [
    {
      pesel: '46020411581',
      birthDate: '11.11.2020',
      lastName: 'Przykładowy',
      firstName: 'Ziomek',
      fotoUrl: 'https://zdjecia/zdjecie.jpg',
      phone: '123456789',
      nextVisit: '2023-11-10 12:30',
    },
    {
      pesel: '12345678978',
      birthDate: '11.11.2020',
      lastName: 'Kościuszko',
      firstName: 'Tadeusz',
      fotoUrl: 'https://zdjecia/zdjecie.jpg',
      phone: '123456789',
      nextVisit: undefined,
    },
    {
      pesel: '51020411582',
      birthDate: '21.01.1867',
      lastName: 'Mickiewicz',
      firstName: 'Adam',
      fotoUrl: 'https://zdjecia/zdjecie.jpg',
      phone: '356987412',
      nextVisit: undefined,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsService);
    router = TestBed.inject(Router);
  });

  it('should sort by Params', () => {
    // given
    const testData: { sortParams: SortParams; expectedResult: { sortField: string; asc: boolean } }[] = [
      {
        sortParams: { sortAsc: 'field1' },
        expectedResult: {
          sortField: 'field1',
          asc: true,
        },
      },
      {
        sortParams: { sortDesc: 'field2' },
        expectedResult: {
          sortField: 'field2',
          asc: false,
        },
      },
      {
        sortParams: {},
        expectedResult: {
          sortField: 'pesel',
          asc: true,
        },
      },
    ];
    testData.forEach((data) => {
      // when then
      expect(service.sortByParamWithDefaultOption(data.sortParams)).toEqual(data.expectedResult);
    });
  });

  it('should map Patients to Card Config', () => {
    // when then
    expect(service.getMappedCardConfig(mockedPersonalDetails)).toEqual(mockedCardConfig);
  });

  it('should get filtered patients by given parameters', () => {
    // given
    const testData: { lastName: string; birthDate: string; pesel: string; phone: string; expectedResult: CardConfig[] }[] = [
      {
        lastName: 'Przy',
        birthDate: '',
        pesel: '',
        phone: '',
        expectedResult: [mockedCardConfig[0]],
      },
      {
        lastName: 'k',
        birthDate: '',
        pesel: '',
        phone: '',
        expectedResult: mockedCardConfig,
      },
      {
        lastName: 'PRZY',
        birthDate: '',
        pesel: '',
        phone: '',
        expectedResult: [mockedCardConfig[0]],
      },
      {
        lastName: 'PRZY',
        birthDate: '',
        pesel: '99',
        phone: '',
        expectedResult: [],
      },
      {
        lastName: 'k',
        birthDate: '',
        pesel: '',
        phone: '356987412',
        expectedResult: [mockedCardConfig[2]],
      },
      {
        lastName: 'K',
        birthDate: '',
        pesel: '51',
        phone: '',
        expectedResult: [mockedCardConfig[2]],
      },
      {
        lastName: '',
        birthDate: '11.11.2020',
        pesel: '',
        phone: '',
        expectedResult: [mockedCardConfig[0], mockedCardConfig[1]],
      },
    ];

    testData.forEach((data) => {
      // when then
      expect(service.getFilteredPatients(data.lastName, data.birthDate, data.pesel, data.phone, mockedPersonalDetails)).toEqual(
        data.expectedResult,
      );
    });
  });

  it('should navigate to selected patient by given pesel', () => {
    // given
    const spy = spyOn(router, 'navigate');
    const pesel = mockedCardConfig[0].pesel;

    //when
    service.navigateToSelectedPatient(pesel);

    // then
    expect(spy).toHaveBeenCalledWith([`patients/details/${pesel}`]);
  });
});
