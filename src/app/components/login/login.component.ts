// login.component.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterModule],
})
export class LoginComponent {

  form: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      const val = this.form.value;
      this.authService.login(val.username, val.password).subscribe({
        next: () => {
          console.log('Success');
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }
  }
}