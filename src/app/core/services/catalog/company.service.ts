import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Company } from 'src/app/core/models/catalog/company.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private Url = environment.baseUrl + '/company';

  constructor(private http: HttpClient) {

  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.Url);
  }

  getCompaniesById(id: number): Observable<Company> {
    return this.http.get<Company>(this.Url + '/' + id);
  }

  create(record: Company): Observable<Company> {
      return this.http.post<Company>(this.Url, record);
  }

  update(record: Company): Observable<Company> {
    return this.http.put<Company>(this.Url + '/' + record.idCompany, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

}
