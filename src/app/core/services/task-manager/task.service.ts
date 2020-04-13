import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/ticket-manager/task/task.model';
import { Observable } from 'rxjs';
import { Subtask } from '../../models/ticket-manager/task/subtask.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private Url = environment.baseUrl + '/task';
  constructor(private http: HttpClient) { }

  create(record: Task): Observable<Subtask> {
     return this.http.post<Subtask>(this.Url, record);
  }
}
