import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private currentUserService: CurrentUserService) {}

  get currentUser() {
    return this.currentUserService.getCurrentUser()
  }

}
