import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserOptionsService } from './user-options.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5298/api/Account';

  constructor(
    private http: HttpClient,
    private router: Router,
    private user: UserOptionsService
  ) {}

  login(EmailOrUsername: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const payload = {
      email: EmailOrUsername.includes('@') ? EmailOrUsername : null,
      username: EmailOrUsername.includes('@') ? null : EmailOrUsername,
      password: Password,
    };
    return this.http.post(`${this.apiUrl}`, payload, { headers }).pipe(
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
