import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { AddUserModalComponent } from '../add-user/add-user-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/header/header.component';
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
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonAvatar,
    IonLabel,
    AddUserModalComponent,
    EditUserModalComponent,
    SidebarComponent,
    HeaderComponent,
  ],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  search = '';
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
    this.loadCurrentUser();
  }

  ionViewWillEnter() {
    this.load();
  }

  async load() {
    this.users = await this.userService.findAll();
  }

  async loadCurrentUser() {
    const id = this.auth.userId;
    if (id) {
      this.currentUser = await this.userService.get(id);
    }
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

  get filteredUsers(): User[] {
    if (!this.search) return this.users;
    const term = this.search.toLowerCase();
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
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
    } catch {
      // error handled globally
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.ui.toast('Logged out', 'success');
  }
}
