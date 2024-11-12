import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { PostAPIService } from '../services/post-api/post-api.service';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';

@Component({
  selector: 'post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss'
})
export class PostItemComponent {

  @Input()
  post!: Post;

  constructor(private postService: PostAPIService, private currentUserService: CurrentUserService) { }

  get currentUser() {
    return this.currentUserService.getCurrentUser()
  }

  getImage(imageUrl: string): string {
    return environment.storageUrl + imageUrl
  }

  deletePost(id: number) {
    this.postService.deletePost(id)
  }
}
