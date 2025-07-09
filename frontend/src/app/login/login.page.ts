// src/app/login/login.page.ts
import { Component } from '@angular/core';
import {
  IonicModule,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Logging in…' });
    await loading.present();

    const { email, password } = this.form.value;
    try {
      await this.authService.login(email, password);
      await loading.dismiss();
      this.navCtrl.navigateRoot('/users');
    } catch {
      await loading.dismiss();
      // handled globally by interceptor
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
