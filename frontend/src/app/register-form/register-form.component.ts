import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });


onSubmit(): void {
  if (this.registerForm.valid) {
    console.log('Form Submitted', this.registerForm.value);
    // Дополнительная логика при отправке формы
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
