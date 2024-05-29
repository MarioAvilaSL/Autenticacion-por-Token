import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) { 
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        tap(users => {
          if (users.length) {
            const token = this.createFakeJwtToken(credentials.email); // Crea un token JWT simulado
            localStorage.setItem('token', token);
            this.router.navigate(['/dashboard']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  private createFakeJwtToken(email: string): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { email: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }; // 1 hora de expiración
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa('fake-signature'); // Simula la firma

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}
