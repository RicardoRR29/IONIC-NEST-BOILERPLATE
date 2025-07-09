import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent {
  @Output() userUpdated = new EventEmitter<User>();
  isOpen = false;
  form: FormGroup;
  private currentUser!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ui: UiService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  open(user: User) {
    this.currentUser = user;
    this.form.patchValue({ name: user.name, email: user.email });
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
      const updated = await this.userService.update(
        this.currentUser.id,
        this.form.value.name!,
        this.form.value.email!,
      );
      this.userUpdated.emit(updated);
      this.ui.toast('User updated', 'success');
      this.close();
    } catch (err) {
      this.ui.toast('Update failed', 'danger');
    }
  }
}
