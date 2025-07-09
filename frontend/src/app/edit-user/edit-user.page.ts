import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonInput,
  IonButton,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { UserService } from '../services/user.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonIcon,
  ],
})
export class EditUserPage implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  id!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.get(this.id).then((user) => {
      this.form.patchValue({ name: user.name, email: user.email });
    });
  }

  async save() {
    if (this.form.invalid) return;
    try {
      await this.userService.update(
        this.id,
        this.form.value.name!,
        this.form.value.email!
      );
      this.ui.toast('User updated', 'success');
      this.router.navigateByUrl('/users');
    } catch (err) {
      this.ui.toast('Update failed', 'danger');
    }
  }

  goBack() {
    this.router.navigateByUrl('/users');
  }
}
