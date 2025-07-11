import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    SidebarComponent,
  ],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
