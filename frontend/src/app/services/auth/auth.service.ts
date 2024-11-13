import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }


  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getUser(): Observable<User> {
    const headers = this.getAuthHeaders()
    return this.http.get<User>(environment.apiUrl + "/user", {headers})
  }


  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, data);
  }

  register(data: { name: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, data)
  }


  logout() {
    try {
    const headers = this.getAuthHeaders()
    this.http.post(`${environment.apiUrl}/logout`, {}, { headers }).subscribe(response => {
        localStorage.removeItem('token')
        this.loggedInSubject.next(false)
        this.router.navigate(['/login'])
      })
    } catch (error) {
     console.error(error)
    }
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  setLoggedIn(state: boolean): void {
    this.loggedInSubject.next(state)
  }
}
