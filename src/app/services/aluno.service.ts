import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Aluno } from '../models/Aluno';
import { PaginatedResult } from '../models/Pagination';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseURL = `${environment.mainUrlAPI}student`;

  constructor(private http: HttpClient) { }

  getAll(page?: number, itermsPerPage?: number): Observable<PaginatedResult<Aluno[]>> {
    const paginatedResult: PaginatedResult<Aluno[]> = new PaginatedResult<Aluno[]>();

    let params = new HttpParams();

    if (page != null && itermsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itermsPerPage.toString());
    }

    return this.http.get<Aluno[]>(this.baseURL, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.baseURL}/${id}`);
  }

  getByCourseId(id: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseURL}/ByCourse/${id}`);
  }

  // TODO - Make for this methods - observables too.
  post(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.baseURL, aluno);
  }

  put(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.baseURL}/${aluno.id}`, aluno);
  }

  trocarEstado(alunoId: number, ativo: boolean): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.baseURL}/changeStatus`, { Id: alunoId, Status: ativo });
  }

  patch(aluno: Aluno): Observable<Aluno> {
    return this.http.patch<Aluno>(`${this.baseURL}/${aluno.id}`, aluno);
  }

  delete(id: number): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.baseURL}/${id}`);
  }

}
