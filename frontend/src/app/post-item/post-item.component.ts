import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';

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

  getImage(imageUrl: string): string {
    let url = `http://localhost:8000/${imageUrl}`
    return url
  }
}
