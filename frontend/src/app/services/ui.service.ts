import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {}

  async toast(message: string, color: 'success' | 'danger' | 'warning' | 'primary' = 'primary') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color, position: 'bottom' });
    await toast.present();
  }

  async confirm(message: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'OK', role: 'confirm' }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }
}
