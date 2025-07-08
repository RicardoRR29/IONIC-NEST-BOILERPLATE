import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonItem,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonCardContent,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
  ],
})
export class RegisterPage {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^(?=.*[^A-Za-z0-9]).{8,}$/)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  async register() {
    if (this.form.invalid) return;
    try {
      await this.auth.register(
        this.form.value.name!,
        this.form.value.email!,
        this.form.value.password!
      );
      this.ui.toast('User created', 'success');
      this.router.navigateByUrl('/login');
    } catch (err) {
      this.ui.toast('Registration failed', 'danger');
    }
  }
}
