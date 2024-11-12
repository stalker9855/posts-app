import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CurrentUserService } from './services/currentUser/current-user-service.service';

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
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn
      if (this.isLoggedIn) {
        this.authService.getUser().subscribe(
          user => {
            this.currentUserService.setCurrentUser(user);
          }
        )
      }
    })
  }

  constructor(public authService: AuthService, private currentUserService: CurrentUserService) { }

}
