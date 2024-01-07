import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

import { patientDetailsResolver } from './patient-details.resolver';
import { PersonalDetails } from '../model/PersonalDetails';
import { PatientsApiService } from '../service/patients-api.service';
import { Observable, of, throwError } from 'rxjs';

describe('patientDetailsResolver', () => {
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

  let resolver: Observable<null | PersonalDetails>;

  describe('User exists', () => {
    const mockedRoute: ActivatedRouteSnapshot = {
      paramMap: convertToParamMap({ pesel: '12345678978' }),
    } as ActivatedRouteSnapshot;

    const mockedApiService = {
      getAllPatients: jasmine.createSpy('getAllPatients').and.returnValue(of(mockedPersonalDetails)),
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ActivatedRouteSnapshot,
            useValue: mockedRoute,
          },
          {
            provide: PatientsApiService,
            useValue: mockedApiService,
          },
        ],
      });
      resolver = TestBed.runInInjectionContext(() => patientDetailsResolver(mockedRoute));
    }));

    it('should return patient details when patient exists', fakeAsync(() => {
      // given
      let personalDetails: PersonalDetails = null as unknown as PersonalDetails;

      // when
      resolver.subscribe((response) => {
        if (response) {
          personalDetails = response;
        }
      });
      tick();

      // then
      expect(mockedApiService.getAllPatients).toHaveBeenCalled();
      expect(personalDetails).toEqual(mockedPersonalDetails[1]);
    }));
  });

  describe('User does not exist', () => {
    const mockedRoute: ActivatedRouteSnapshot = {
      paramMap: convertToParamMap({ pesel: '99999999999' }),
    } as ActivatedRouteSnapshot;

    const mockedApiService = {
      getAllPatients: jasmine.createSpy('getAllPatients').and.returnValue(of(mockedPersonalDetails)),
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ActivatedRouteSnapshot,
            useValue: mockedRoute,
          },
          {
            provide: PatientsApiService,
            useValue: mockedApiService,
          },
        ],
      });
      resolver = TestBed.runInInjectionContext(() => patientDetailsResolver(mockedRoute));
    }));

    it('should return null when patient does not exist', fakeAsync(() => {
      // given
      let personalDetails: PersonalDetails = null as unknown as PersonalDetails;

      // when
      resolver.subscribe((response) => {
        if (response) {
          personalDetails = response;
        }
      });
      tick();

      // then
      expect(mockedApiService.getAllPatients).toHaveBeenCalled();
      expect(personalDetails).toBeNull();
    }));
  });

  describe('Error', () => {
    const mockedRoute: ActivatedRouteSnapshot = {
      paramMap: convertToParamMap({ pesel: '99999999999' }),
    } as ActivatedRouteSnapshot;

    const mockedApiService = {
      getAllPatients: jasmine.createSpy('getAllPatients').and.returnValue(throwError(() => 'Error')),
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ActivatedRouteSnapshot,
            useValue: mockedRoute,
          },
          {
            provide: PatientsApiService,
            useValue: mockedApiService,
          },
        ],
      });
      resolver = TestBed.runInInjectionContext(() => patientDetailsResolver(mockedRoute));
    }));

    it('should return null when error occurs', fakeAsync(() => {
      // given
      let personalDetails: PersonalDetails = null as unknown as PersonalDetails;
      const consoleSpy = spyOn(console, 'error');

      // when
      resolver.subscribe((response) => {
        if (response) {
          personalDetails = response;
        }
      });
      tick();

      // then
      expect(personalDetails).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Error:', 'Error');
    }));
  });
});
