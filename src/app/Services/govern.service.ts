import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addGovern } from '../Models/Govern/addgovern.model';

@Injectable({
  providedIn: 'root',
})
export class GovernService {
  url = 'http://localhost:5298/api/Govern';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  getGovernById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  addGovern(govern: addGovern): Observable<any> {
    return this.http.post(`${this.url}/AddGovernWithCity`, govern);
  }

  updateGovern(govern: addGovern): Observable<any> {
    return this.http.put(this.url, govern);
  }

  editGovern(id: number, govern: addGovern): Observable<any> {
    return this.http.put(`${this.url}/${id}`, govern);
  }
}
