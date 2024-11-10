import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostAPIService } from './post-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title: Observable<string> = of('Hello');

  constructor(private postService: PostAPIService) {}
  ngOnInit(): void {
      this.postService.fetchData().subscribe()
  }

}
