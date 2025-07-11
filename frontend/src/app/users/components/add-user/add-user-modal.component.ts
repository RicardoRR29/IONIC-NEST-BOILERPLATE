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
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
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
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
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
        this.userUpdated.emit(updated);
        this.ui.toast('User updated', 'success');
      } else {
        const user = await this.userService.create(
          this.form.value.name!,
          this.form.value.email!,
          this.form.value.password!,
        );
        this.userCreated.emit(user);
        this.ui.toast('User created', 'success');
      }
      this.close();
    } catch {
      // error handled globally
    }
  }
}
