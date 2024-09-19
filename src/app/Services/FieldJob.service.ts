import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FieldJobService {
  private apiUrl = 'http://localhost:5298/api/FieldJob';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getJobById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addJob(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job);
  }

  updateJob(job: any): Observable<any> {
    debugger;
    return this.http.put<any>(this.apiUrl, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
