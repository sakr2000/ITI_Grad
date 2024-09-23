import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      EmailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['']);
        }
      },
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.value.EmailOrUsername,
          this.loginForm.value.password
        )
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error('Login error', error);
          },
        });
    }
  }
}
