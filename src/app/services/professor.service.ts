import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Professor } from '../models/Professor';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseURL = `${environment.mainUrlAPI}teacher`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseURL);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseURL}/${id}`);
  }

  getByAlunoId(id: number): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseURL}/ByStudent/${id}`);
  }

  post(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.baseURL, Professor);
  }

  put(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.baseURL}/${professor.id}`, Professor);
  }

  delete(id: number): Observable<Professor> {
    return this.http.delete<Professor>(`${this.baseURL}/${id}`);
  }

}
