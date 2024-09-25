import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgentService implements CRUD<any> {
  api = 'http://localhost:5298/api/Agent';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/GetAll`);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/GetById/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5298/AddAgent', data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}`, data);
  }
  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.api}/Delete/${id}`);
  }
}
