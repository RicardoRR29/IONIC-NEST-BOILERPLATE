import { Component } from '@angular/core';
import {
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonCardContent,
    CommonModule,
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  isOpen = false;
  message = '';
  private resolver?: (value: boolean) => void;

  open(message: string): Promise<boolean> {
    this.message = message;
    this.isOpen = true;
    return new Promise((resolve) => {
      this.resolver = resolve;
    });
  }

  close(result: boolean) {
    this.isOpen = false;
    this.resolver?.(result);
  }
}
