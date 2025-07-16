import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  color: 'success' | 'danger' | 'warning' | 'primary';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  show(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary',
    duration = 2000
  ) {
    this.toastSubject.next({
      id: this.counter++,
      message,
      color,
      duration,
    });
  }

  success(message: string, duration = 2000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 3000) {
    this.show(message, 'danger', duration);
  }
}
