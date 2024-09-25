import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    EmailOrUsername: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}
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
            this.toastr.error(
              'البريد الإلكتروني او كلمة المرور غير صحيحة',
              'خطأ'
            );
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
