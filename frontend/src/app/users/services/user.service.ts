import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`${this.base}/users`));
  }

  get(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.base}/users/${id}`));
  }

  create(name: string, email: string, password: string): Promise<User> {
    return firstValueFrom(
      this.http.post<User>(`${this.base}/users`, { name, email, password })
    );
  }

  update(id: number, name: string, email: string): Promise<User> {
    return firstValueFrom(
      this.http.put<User>(`${this.base}/users/${id}`, { name, email })
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.base}/users/${id}`));
  }
}
