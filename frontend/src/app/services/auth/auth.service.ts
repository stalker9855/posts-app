import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, data);
  }

  register() {

  }

  logout() {
    try {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    console.log('logout service')
    this.http.post(`${environment.apiUrl}/logout`, {}, { headers }).subscribe(response => {
        localStorage.removeItem('token')
      })
    } catch (error) {
     console.error(error)
    }
  }
}
