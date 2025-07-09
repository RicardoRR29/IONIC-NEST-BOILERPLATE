// src/app/add-user/add-user-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  @Output() userCreated = new EventEmitter<User>();
  isOpen = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ui: UiService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  open() {
    this.isOpen = true;
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
      const user = await this.userService.create(
        this.form.value.name!,
        this.form.value.email!,
        this.form.value.password!,
      );
      this.userCreated.emit(user);
      this.ui.toast('User created', 'success');
      this.close();
    } catch (err) {
      this.ui.toast('Create failed', 'danger');
    }
  }
}
