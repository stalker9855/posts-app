import { Component, OnInit } from '@angular/core';
import { PostAPIService } from '../post-api.service';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  posts?: Post[]
  constructor(private postService: PostAPIService) {
  }
  ngOnInit(): void {
    this.postService.data$.subscribe((data) => {
      this.posts = data
    })
  }

}
