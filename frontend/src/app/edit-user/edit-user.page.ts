import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
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
    private router: Router
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.get(this.id).then((user) => {
      this.form.patchValue({ name: user.name, email: user.email });
    });
  }

  async save() {
    if (this.form.invalid) return;
    await this.userService.update(
      this.id,
      this.form.value.name!,
      this.form.value.email!
    );
    this.router.navigateByUrl('/users');
  }
}
