import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addGovern, editGovern } from '../Models/Govern.interface';
import { CRUD } from '../Models/CRUD.interface';

@Injectable({
  providedIn: 'root',
})
export class GovernService implements CRUD<any> {
  url = 'http://localhost:5298/api/Govern';
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  create(data: addGovern): Observable<any> {
    return this.http.post(`${this.url}/AddGovernWithCity`, data);
  }
  update(id: number, data: editGovern): Observable<any> {
    return this.http.put(this.url, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }
}
