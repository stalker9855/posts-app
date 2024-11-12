import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  registerForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as { name: string, email: string, password: string }).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        }
      })
    } else {
      const errors = this.registerForm.errors ? this.registerForm.errors['passwordMismatch'] : null;
      if (errors) {
        console.log('Passwords do not match');
      } else {
        console.log('Form is invalid');
      }
    }
  }
}
