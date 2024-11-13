import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';
import { Post } from '../models/post.model';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostItemComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];


  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.currentUserService.getUserPosts().subscribe(
      (data) => {
        this.posts = data
        console.log(this.posts)
      }
    )
  }

  get currentUser() {
    return this.currentUserService.getCurrentUser()
  }



}
