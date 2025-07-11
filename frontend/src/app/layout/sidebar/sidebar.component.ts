import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonMenu, IonContent, IonIcon, IonMenuToggle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, IonList, IonItem, IonLabel, IonMenu, IonContent, IonIcon, IonMenuToggle],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public auth: AuthService) {}
}
