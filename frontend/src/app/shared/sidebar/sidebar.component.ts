import { Component } from '@angular/core';
import {
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {}
