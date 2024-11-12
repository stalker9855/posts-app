import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Post } from '../../models/post.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostAPIService {
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient, private authService: AuthService) { }


  getPosts(): Observable<Post[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Post[]>(this.apiUrl + '/posts', { headers })
  }
  createPost(formData: FormData): Observable<Post> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Post>(this.apiUrl + '/posts', formData, { headers })
  }

  deletePost(id: number): any {
    const headers = this.authService.getAuthHeaders();
    console.log(this.apiUrl + '/posts/' + id)
    return this.http.delete<any>(this.apiUrl + '/posts/' + id, { headers }).subscribe(
      response => {
        console.log(response)
      }
    )
  }
}
