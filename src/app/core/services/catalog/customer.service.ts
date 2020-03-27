import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/catalog/customer.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private Url = environment.baseUrl + '/customer';

  constructor(private http: HttpClient) {

  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.Url);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.Url + '/' + id);
  }

  create(record: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.Url, record);
  }

  update(record: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.Url + '/' + record.idCustomer, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

}
