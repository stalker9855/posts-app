import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostAPIService } from '../services/post-api/post-api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostItemComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  posts?: Post[]
  constructor(private postService: PostAPIService) {
  }
  ngOnInit(): void {
    this.fetchPosts()
  }
  fetchPosts(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data
    })
  }


}
