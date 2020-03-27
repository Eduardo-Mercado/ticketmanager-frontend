import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dropdown } from '../models/dropdown.model';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private Url = environment.baseUrl + '/dropdown';

  constructor(private http: HttpClient) {

  }

  getDropdownByTable(table: string): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(this.Url + '/' + table);
  }

  getDropDownByTable_Filter(table: string, id: number): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(this.Url + '/' + table + '/' + id);
  }

}
