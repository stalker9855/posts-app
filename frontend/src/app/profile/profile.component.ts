import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user?: User
  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.user = data
        console.log(data)
      },
      (error) => {
        console.error(error)
      }
    )
  }

}
