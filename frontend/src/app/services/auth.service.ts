import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.base}/auth/login`, { email, password })
    );
    localStorage.setItem('token', res.access_token);
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await firstValueFrom(
      this.http.post(`${this.base}/auth/register`, { name, email, password })
    );
  }

  async logout(): Promise<void> {
    const token = this.token;
    localStorage.removeItem('token');
    if (token) {
      try {
        await firstValueFrom(
          this.http.post(
            `${this.base}/auth/logout`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        );
      } catch {
        // ignore errors
      }
    }
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get userId(): number | null {
    const token = this.token;
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Temporary helper to access the logged in user id.
   *
   * Some components expect `auth.user` to exist. Exposing a
   * getter avoids template errors without changing the API.
   */
  get user(): number | null {
    return this.userId;
  }

  isLoggedIn(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() < payload.exp * 1000) {
        return true;
      }
    } catch {
      // ignore parsing errors
    }
    // token invalid or expired
    this.logout();
    return false;
  }
}
