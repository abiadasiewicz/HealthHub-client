import { TestBed } from '@angular/core/testing';

import { PatientsApiService } from './patients-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonalDetails, PersonalDetailsToSave } from '../model/PersonalDetails';

describe('PatientsApiService', () => {
  let service: PatientsApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/patients';

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

  const patientToUpdate: PersonalDetailsToSave = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PatientsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get all patients', () => {
    // when
    service.getAllPatients().subscribe((response) => {
      // then
      expect(response).toEqual(mockedPersonalDetails);
    });
    httpMock.expectOne({ method: 'GET', url: apiUrl }).flush(mockedPersonalDetails);
    httpMock.verify();
  });

  it('should update patient', () => {
    // given
    const patientId = 1;

    // when
    service.updatePatient(patientId, patientToUpdate).subscribe((response) => {
      // then
      expect(response).toEqual(mockedPersonalDetails[0]);
    });
    httpMock.expectOne({ method: 'PATCH', url: apiUrl + '/1' }).flush(mockedPersonalDetails[0]);
    httpMock.verify();
  });

  it('should add patient', () => {
    // when
    service.addPatient(patientToUpdate).subscribe((response) => {
      // then
      expect(response).toEqual(mockedPersonalDetails[0]);
    });
    httpMock.expectOne({ method: 'POST', url: apiUrl }).flush(mockedPersonalDetails[0]);
    httpMock.verify();
  });
});
