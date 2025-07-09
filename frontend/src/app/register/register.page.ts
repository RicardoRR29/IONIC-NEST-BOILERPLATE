// src/app/register/register.page.ts
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
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Registering…' });
    await loading.present();

    // ✅ Destructure to pass individual args
    const { name, email, password } = this.form.value;

    try {
      await this.authService.register(name, email, password);
      await loading.dismiss();
      this.navCtrl.navigateRoot('/users');
    } catch {
      await loading.dismiss();
      // handled globally by interceptor
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
