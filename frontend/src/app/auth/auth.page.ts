import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form: FormGroup;
  show = false;
  mode: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[^A-Za-z0-9]/),
      ]],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot('/users');
    }
    this.route.url.subscribe(() => {
      const path = this.route.snapshot.routeConfig?.path;
      this.mode = path === 'register' ? 'register' : 'login';
      if (this.mode === 'register') {
        this.form.get('name')?.setValidators(Validators.required);
      } else {
        this.form.get('name')?.clearValidators();
      }
      this.form.get('name')?.updateValueAndValidity();
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: this.mode === 'login' ? 'Logging in…' : 'Registering…',
    });
    await loading.present();
    const { name, email, password } = this.form.value;
    try {
      if (this.mode === 'login') {
        await this.authService.login(email, password);
      } else {
        await this.authService.register(name, email, password);
      }
      await loading.dismiss();
      this.navCtrl.navigateRoot('/users');
    } catch {
      await loading.dismiss();
    }
  }

  toggleMode() {
    if (this.mode === 'login') {
      this.navCtrl.navigateForward('/register');
    } else {
      this.navCtrl.navigateBack('/login');
    }
  }
}
