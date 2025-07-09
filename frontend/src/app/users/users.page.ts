import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { AddUserModalComponent } from '../add-user/add-user-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    AddUserModalComponent,
    EditUserModalComponent,
  ],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  @ViewChild(AddUserModalComponent) addModal!: AddUserModalComponent;
  @ViewChild(EditUserModalComponent) editModal!: EditUserModalComponent;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.load();
  }

  ionViewWillEnter() {
    this.load();
  }

  async load() {
    this.users = await this.userService.findAll();
  }

  addUser() {
    this.addModal.open();
  }

  userAdded(user: User) {
    this.users.push(user);
  }

  editUser(user: User) {
    this.editModal.open(user);
  }

  userUpdated(updated: User) {
    const index = this.users.findIndex((u) => u.id === updated.id);
    if (index > -1) {
      this.users[index] = updated;
    }
  }

  async deleteUser(user: User) {
    const ok = await this.ui.confirm('Delete user?');
    if (!ok) return;
    try {
      await this.userService.delete(user.id);
      this.ui.toast('User deleted', 'success');
      if (user.id === this.auth.userId) {
        this.logout();
      } else {
        this.load();
      }
    } catch (err) {
      this.ui.toast('Delete failed', 'danger');
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.ui.toast('Logged out', 'success');
  }
}
