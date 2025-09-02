import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PersonalDetails, PersonalDetailsToSave} from '../model/PersonalDetails';
import {Observable} from 'rxjs';
import {PatientData} from "../model/PatientData";

@Injectable({
  providedIn: 'root',
})
export class PatientsApiService {
  private readonly apiUrl = 'api/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<PersonalDetails[]> {
    return this.http.get<PersonalDetails[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<PersonalDetails> {
    return this.http.get<PersonalDetails>(`${this.apiUrl}/${id}`);
  }

  addPatient(newPatient: PatientData): Observable<PatientData> {
    return this.http.post<PatientData>(`${this.apiUrl}/new`, newPatient);
  }

  updatePatient(id: number, updatedPatient: PatientData): Observable<PersonalDetails> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.patch<PersonalDetails>(url, updatedPatient);
  }

  deletePatient(id: number): Observable<number> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<number>(url);
  }
}
