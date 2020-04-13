import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItem, User } from '../../models/security/user.model';
import { OptionApp } from '../../models/security/menu.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = environment.baseUrl + '/auth';
  constructor(private http: HttpClient) {

  }

  signIn(data: User): Observable<any> {
     return this.http.get<any>(this.Url + '/' + data.userName + '/' + data.passwd);
  }

  getUsers(): Observable<UserItem[]>{
    return this.http.get<UserItem[]>(this.Url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.Url + '/' + id);
  }

  create(record: User): Observable<UserItem> {
    return this.http.post<UserItem>(this.Url, record);
  }

  update(record: User): Observable<UserItem> {
    return this.http.put<UserItem>(this.Url + '/' + record.id, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

  getOptionsOfUserID(id: number): Observable<OptionApp[]> {
     return this.http.get<OptionApp[]>(this.Url + '/getOption' + id);
  }
}
