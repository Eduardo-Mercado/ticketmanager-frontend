import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Ticket, TicketIndex, TicketFile, TicketAgent } from '../../models/ticket-manager/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private Url = environment.baseUrl + '/ticket';
  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<TicketIndex[]> {
    return this.http.get<TicketIndex[]>(this.Url);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.Url + '/' + id);
  }

  create(record: Ticket): Observable<TicketIndex> {
      return this.http.post<TicketIndex>(this.Url, record);
  }

  update(record: Ticket): Observable<TicketIndex> {
    return this.http.put<TicketIndex>(this.Url + '/' + record.idTicket, record);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.Url + '/' + id);
  }

  getFile(id: number): Observable<TicketFile[]> {
      return this.http.get<TicketFile[]>(environment.baseUrl + '/file/' + id);
  }

  getTicketWithFile(id: number) {
  const ticket  = this.http.get<Ticket>(this.Url + '/' + id);
  const files = this.http.get<TicketFile[]>(environment.baseUrl + '/file/' + id);

  return forkJoin([files, ticket]);
  }

  uploadFiles(files) {
    return this.http.post(environment.baseUrl + '/file', files, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getTicketsByAgent(id: number): Observable<TicketAgent[]> {
    return this.http.get<TicketAgent[]>(this.Url + '/byAgent/' + id);
  }
}
