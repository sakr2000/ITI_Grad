import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUD } from '../models/CRUD.interface';

@Injectable({
  providedIn: 'root',
})
export class BranchService implements CRUD<any> {
  private apiUrl = 'http://localhost:5298/api/Branch';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getById(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name: data };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
  update(id: number, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
