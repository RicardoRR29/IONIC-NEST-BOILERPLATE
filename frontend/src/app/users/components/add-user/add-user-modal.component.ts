import { Component, EventEmitter, Output } from '@angular/core';
import {
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { UiService } from '../../../core/services/ui.service';
import { ErrorTranslatorService } from '../../../core/services/error-translator.service';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonCardContent,
    IonItem,
    IonInput,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  @Output() userCreated = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();

  isOpen = false;
  editing = false;
  private currentUser: User | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ui: UiService,
    private translator: ErrorTranslatorService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[^A-Za-z0-9]/),
      ]],
    });
  }

  open(user?: User) {
    this.isOpen = true;
    if (user) {
      this.editing = true;
      this.currentUser = user;
      this.form.patchValue({ name: user.name, email: user.email, password: '' });
      this.form.get('password')?.disable();
      this.form.get('password')?.clearValidators();
    } else {
      this.editing = false;
      this.currentUser = null;
      this.form.reset();
      this.form.get('password')?.enable();
      this.form.get('password')?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[^A-Za-z0-9]/),
      ]);
    }
    this.form.updateValueAndValidity();
  }

  close() {
    this.isOpen = false;
    this.form.reset();
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      if (this.editing && this.currentUser) {
        const updated = await this.userService.update(
          this.currentUser.id,
          this.form.value.name!,
          this.form.value.email!,
        );
        const msg = (updated as any)?.message;
        this.userUpdated.emit(updated as User);
        this.ui.toast(msg || 'Usuário atualizado', 'success');
      } else {
        const user = await this.userService.create(
          this.form.value.name!,
          this.form.value.email!,
          this.form.value.password!,
        );
        const msg = (user as any)?.message;
        this.userCreated.emit(user as User);
        this.ui.toast(msg || 'Usuário criado', 'success');
      }
      this.close();
    } catch (error) {
      const httpError = error as any;
      const message =
        httpError?.error?.userMessage ||
        this.translator.translate(httpError?.error?.internalCode);
      this.ui.toast(message, 'danger');
    }
  }
}
