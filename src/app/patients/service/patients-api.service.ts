import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalDetails, PersonalDetailsToSave } from '../model/PersonalDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsApiService {
  private readonly apiUrl = 'api/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<PersonalDetails[]> {
    return this.http.get<PersonalDetails[]>(this.apiUrl);
  }

  addPatient(newPatient: PersonalDetailsToSave): Observable<PersonalDetails> {
    return this.http.post<PersonalDetails>(this.apiUrl, newPatient);
  }

  updatePatient(id: number, updatedPatient: PersonalDetailsToSave): Observable<PersonalDetails> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<PersonalDetails>(url, updatedPatient);
  }
}
