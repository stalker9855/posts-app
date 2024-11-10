import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Post } from './models/post.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostAPIService {
  apiUrl = `${environment.apiUrl}/posts`;
  posts$: Observable<Post[]>;
  private dataSubject = new BehaviorSubject<Post[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.posts$ = this.getPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
  fetchData(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      tap((data) => this.dataSubject.next(data)))
  }
}
