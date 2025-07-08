// src/app/login/login.page.ts
import { Component } from '@angular/core';
import {
  IonicModule,
  NavController,
  ToastController,
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
    private toastCtrl: ToastController,
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
    } catch (err: any) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: err?.message || 'Login failed',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
