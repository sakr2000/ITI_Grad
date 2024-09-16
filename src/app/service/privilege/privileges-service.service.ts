import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldJob } from '../../models/Privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesServiceService {

  private apiUrl = 'http://localhost:5298/api/FieldJob';

  constructor(private http: HttpClient) { }

  getPrivileges(): Observable<FieldJob[]> {
    return this.http.get<FieldJob[]>(this.apiUrl);
  }

  createPrivilege(privilege: FieldJob): Observable<FieldJob> {
    return this.http.post<FieldJob>(this.apiUrl, privilege);
  }
  updatePrivilege(id: number, privilege: FieldJob): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, privilege);
  }
}
