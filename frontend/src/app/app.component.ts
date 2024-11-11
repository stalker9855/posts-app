import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
      this.checkLoginStatus();
  }

  constructor(private router: Router, private authService: AuthService) {}

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    try {
    this.authService.logout()
    console.log('logout')
    this.router.navigate(['/login'])

    } catch (e) {
      console.error(e)
    }
  }

}
