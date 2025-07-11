import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonMenu, IonContent, IonList, IonItem, IonIcon, IonButton, IonLabel, IonMenuToggle } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, IonMenu, IonContent, IonList, IonItem, IonIcon, IonButton, IonLabel, IonMenuToggle],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentUser: User | null = null;

  constructor(private auth: AuthService, private userService: UserService) {
    const id = this.auth.userId;
    if (id) {
      this.userService.get(id).then(u => (this.currentUser = u));
    }
  }

  logout() {
    this.auth.logout();
  }

  get tokenStatus(): string {
    return this.auth.token ? 'valid' : 'invalid';
  }
}
