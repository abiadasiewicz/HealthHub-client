import { patientsPageResolver } from './patients-page.resolver';
import { PatientsApiService } from '../service/patients-api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('patientsPageResolver', () => {
  const mockedApiService = {
    getAllPatients: jasmine.createSpy('getAllPatients'),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PatientsApiService,
          useValue: mockedApiService,
        },
      ],
    });
  }));

  it('should return all patients', () => {
    // when
    void TestBed.runInInjectionContext(() =>
      patientsPageResolver(null as unknown as ActivatedRouteSnapshot, null as unknown as RouterStateSnapshot),
    );

    // then
    expect(mockedApiService.getAllPatients).toHaveBeenCalled();
  });
});
