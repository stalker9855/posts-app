import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostAPIService {
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<Post[]>(this.apiUrl + '/posts', { headers  })

  }
}
