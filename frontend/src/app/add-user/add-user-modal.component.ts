import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonItem,
  IonModal,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { UserService } from '../services/user.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonModal,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class AddUserModalComponent {
  isOpen = false;
  @Output() userCreated = new EventEmitter<void>();
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
    private userService: UserService,
    private ui: UiService
  ) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.form.reset();
  }

  async save() {
    if (this.form.invalid) return;
    try {
      await this.userService.create(
        this.form.value.name!,
        this.form.value.email!,
        this.form.value.password!
      );
      this.ui.toast('User created', 'success');
      this.userCreated.emit();
      this.close();
    } catch (err) {
      this.ui.toast('Create failed', 'danger');
    }
  }
}
