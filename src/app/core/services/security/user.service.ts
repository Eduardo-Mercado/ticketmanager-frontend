import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserItem, User } from '../../models/security/user.model';
import { OptionApp } from '../../models/security/menu.model';
import { map } from 'rxjs/operators';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = environment.baseUrl + '/auth';
  // private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {

  }

  signIn(data: User): Observable<any> {
     return this.http.get<any>(this.Url + '/' + data.userName + '/' + data.passwd).pipe(
       map( (info: any) => {
          // this.currentUserSubject.next(info.userData);
          localStorage.setItem('prv', JSON.stringify( info.userData));
          return info;
       })
     );
  }

  getUsers(): Observable<UserItem[]>{
    return this.http.get<UserItem[]>(this.Url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.baseUrl + '/user/' + id);
  }

  create(record: User): Observable<UserItem> {
    return this.http.post<UserItem>(this.Url, record);
  }

  update(record: User): Observable<UserItem> {
    return this.http.put<UserItem>(environment.baseUrl + '/user/' + record.id, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

  getOptionsOfUserID(id: number): Observable<OptionApp[]> {
     return this.http.get<OptionApp[]>(this.Url + '/getOption' + id);
  }

  getCurrentUser(): Observable<any> {
    // return this.currentUserSubject.value;
    return JSON.parse(localStorage.getItem('prv'));
  }
}
