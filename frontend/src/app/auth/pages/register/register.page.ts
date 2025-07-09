// src/app/register/register.page.ts
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
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
    } catch (err: any) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: err?.message || 'Registration failed',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
