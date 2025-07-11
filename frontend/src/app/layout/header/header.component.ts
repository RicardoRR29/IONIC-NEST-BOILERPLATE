import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Output() add = new EventEmitter<void>();
}
