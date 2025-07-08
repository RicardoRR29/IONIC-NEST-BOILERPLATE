import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonButton, IonButtons } from '@ionic/angular/standalone';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonButton, IonButtons],
})
export class UsersPage implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.users = await this.userService.findAll();
  }

  addUser() {
    this.router.navigateByUrl('/register');
  }

  editUser(user: User) {
    this.router.navigate(['/users', user.id, 'edit']);
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
