import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Privilege } from '../Models/Privilege';

@Injectable({
  providedIn: 'root',
})
export class PrivilegesService {
  private apiUrl = 'http://localhost:5298/api/Privilege';

  constructor(private http: HttpClient) {}

  getPrivileges(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(this.apiUrl);
  }

  createPrivilege(privilege: Privilege): Observable<Privilege> {
    return this.http.post<Privilege>(this.apiUrl, privilege);
  }
  updatePrivilege(id: number, privilege: Privilege): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, privilege);
  }
}
