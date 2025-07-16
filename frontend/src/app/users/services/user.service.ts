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

  create(
    name: string,
    email: string,
    password: string,
  ): Promise<User & { message?: string }> {
    return firstValueFrom(
      this.http.post<User & { message?: string }>(`${this.base}/users`, {
        name,
        email,
        password,
      }),
    );
  }

  update(
    id: number,
    name: string,
    email: string,
  ): Promise<User & { message?: string }> {
    return firstValueFrom(
      this.http.put<User & { message?: string }>(`${this.base}/users/${id}`, {
        name,
        email,
      }),
    );
  }

  delete(id: number): Promise<{ message?: string }> {
    return firstValueFrom(
      this.http.delete<{ message?: string }>(`${this.base}/users/${id}`),
    );
  }
}
