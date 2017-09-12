import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TaskHistory } from '../domain';

@Injectable()
export class HistoryService {
  private readonly domain = 'history';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( @Inject('BASE_CONFIG') private config, private http: HttpClient) {
  }

  addTaskHistory(history: TaskHistory): Observable<TaskHistory> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<TaskHistory>(uri, JSON.stringify(history), { headers: this.headers });
  }

  getTaskHistory(taskId: string): Observable<TaskHistory[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('taskId', taskId);

    return this.http.get<TaskHistory[]>(uri, { params });
  }
}
