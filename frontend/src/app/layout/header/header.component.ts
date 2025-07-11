import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonicModule, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() newUser = new EventEmitter<void>();
}
