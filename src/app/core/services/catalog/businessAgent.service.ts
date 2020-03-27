import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BusinessAgent } from 'src/app/core/models/catalog/businessAgent.model';


@Injectable({
  providedIn: 'root'
})
export class BusinessAgentService {

  private Url = environment.baseUrl + '/businessAgent';

  constructor(private http: HttpClient) {

  }

  getBusinessAgents(): Observable<BusinessAgent[]> {
    return this.http.get<BusinessAgent[]>(this.Url);
  }

  getBusinessAgentById(id: number): Observable<BusinessAgent> {
    return this.http.get<BusinessAgent>(this.Url + '/' + id);
  }

  create(record: BusinessAgent): Observable<BusinessAgent> {
      return this.http.post<BusinessAgent>(this.Url, record);
  }

  update(record: BusinessAgent): Observable<BusinessAgent> {
    return this.http.put<BusinessAgent>(this.Url + '/' + record.idBusinessAgent, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

}
