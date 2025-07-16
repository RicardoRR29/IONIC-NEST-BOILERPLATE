import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  LoadingController,
  NavController,
} from '@ionic/angular/standalone';
import { UiService } from '../core/services/ui.service';
import { ErrorTranslatorService } from '../core/services/error-translator.service';
import { FormErrorComponent } from '../shared/form-error/form-error.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    FormErrorComponent,
  ],
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
    private ui: UiService,
    private translator: ErrorTranslatorService
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[^A-Za-z0-9]/),
        ],
      ],
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
    console.log('[submit] Called');

    if (this.form.invalid) {
      console.warn('[submit] Form is invalid:', this.form.value);
      this.form.markAllAsTouched();
      return;
    }

    console.log('[submit] Form is valid:', this.form.value);

    const loadingMessage =
      this.mode === 'login' ? 'Logging in…' : 'Registering…';
    console.log(`[submit] Showing loading: "${loadingMessage}"`);

    const loading = await this.loadingCtrl.create({
      message: loadingMessage,
    });

    await loading.present();
    console.log('[submit] Loading presented');

    const { name, email, password } = this.form.value;
    console.log('[submit] Extracted form values:', { name, email, password });

    try {
      let msg: string | undefined;
      if (this.mode === 'login') {
        console.log('[submit] Mode is login. Attempting login…');
        msg = await this.authService.login(email, password);
        console.log('[submit] Login successful');
      } else {
        console.log('[submit] Mode is register. Attempting registration…');
        msg = await this.authService.register(name, email, password);
        console.log('[submit] Registration successful');
      }

      await loading.dismiss();
      console.log('[submit] Loading dismissed after success');

      this.ui.toast(
        msg || (this.mode === 'login' ? 'Login realizado' : 'Usuário registrado'),
        'success'
      );
      console.log('[submit] Navigating to /users');
      this.navCtrl.navigateRoot('/users');
    } catch (error) {
      console.error('[submit] Error occurred:', error);
      await loading.dismiss();
      console.log('[submit] Loading dismissed after error');
      const httpError = error as any;
      const message =
        httpError?.error?.userMessage ||
        this.translator.translate(httpError?.error?.internalCode);
      this.ui.toast(message, 'danger');
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
