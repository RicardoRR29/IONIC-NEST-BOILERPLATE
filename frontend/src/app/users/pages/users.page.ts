import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AddUserModalComponent } from '../components/add-user/add-user-modal.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { UserStatsComponent } from '../components/user-stats/user-stats.component';
import { UsersTableComponent } from '../components/users-table/users-table.component';
import { User, UserService } from '../services/user.service';
import { UiService } from '../../core/services/ui.service';
import { ErrorTranslatorService } from '../../core/services/error-translator.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Necessário para ngModel funcionar
    IonContent,
    IonButton,
    IonIcon,
    IonSearchbar,
    HeaderComponent,
    AddUserModalComponent,
    ConfirmModalComponent,
    UserStatsComponent,
    UsersTableComponent,
  ],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  search: string = '';
  currentUser: User | null = null;

  @ViewChild(AddUserModalComponent) addModal!: AddUserModalComponent;
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private ui: UiService,
    private translator: ErrorTranslatorService
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.load();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ionViewWillEnter() {
    if (this.auth.isLoggedIn()) {
      this.load();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  async load() {
    try {
      this.users = await this.userService.findAll();

      // get the userId from the token and resolve the current user
      const id = this.auth.userId;
      this.currentUser = id ? this.users.find((u) => u.id === id) ?? null : null;
    } catch (error) {
      const httpError = error as any;
      const message =
        httpError?.error?.userMessage ||
        this.translator.translate(httpError?.error?.internalCode);
      this.ui.toast(message, 'danger');
    }
  }

  filteredUsers(): User[] {
    if (!this.search.trim()) return this.users;
    const query = this.search.toLowerCase();
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    );
  }

  addUser() {
    this.addModal.open();
  }

  userAdded(user: User) {
    this.users.push(user);
  }

  editUser(user: User) {
    this.addModal.open(user);
  }

  userUpdated(updated: User) {
    const index = this.users.findIndex((u) => u.id === updated.id);
    if (index > -1) {
      this.users[index] = updated;
    }
  }

  async deleteUser(user: User) {
    const ok = await this.confirmModal.open('Deseja excluir este usuário?');
    if (!ok) return;
    try {
      const res = await this.userService.delete(user.id);
      const msg = res?.message;
      this.ui.toast(msg || 'Usuário excluído', 'success');
      if (user.id === this.auth.userId) {
        this.logout();
      } else {
        this.load();
      }
    } catch (error) {
      const httpError = error as any;
      const message =
        httpError?.error?.userMessage ||
        this.translator.translate(httpError?.error?.internalCode);
      this.ui.toast(message, 'danger');
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.ui.toast('Sessão encerrada', 'success');
  }
}
