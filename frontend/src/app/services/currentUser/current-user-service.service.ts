import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {}
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }


  getUserPosts(): Observable<Post[]> {
    const headers = this.authService.getAuthHeaders()
    return this.http.get<Post[]>(environment.apiUrl + "/userPosts", {headers})
  }
}
