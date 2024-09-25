import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5298/api/Account';

  constructor(private http: HttpClient, private user: UserDataService) {}

  login(EmailOrUsername: string, Password: string): Observable<any> {
    let payload: any = {
      password: Password,
    };
    payload =
      EmailOrUsername.includes('@') && !EmailOrUsername.includes('admin')
        ? { ...payload, email: EmailOrUsername }
        : { ...payload, username: EmailOrUsername };

    return this.http.post(`${this.apiUrl}`, payload).pipe(
      tap({
        next: (response: any) => {
          console.log(response);
          this.user.setUserData(response);
        },
        error: (error) => {
          if (error.status === 400) {
            console.error('Bad request:', error.error.message);
          } else {
            console.error('An unexpected error occurred:', error.error.message);
          }
        },
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<{ isAuthenticated: boolean }>(`${this.apiUrl}/auth/check`)
      .pipe(
        map((response) => response.isAuthenticated),
        catchError(() => [false])
      );
  }
}
