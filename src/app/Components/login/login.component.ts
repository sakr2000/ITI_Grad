import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      EmailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
          },
          error: (error) => {
            console.error('Login error', error);
          },
        });
    }
  }
}
