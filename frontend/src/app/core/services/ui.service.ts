import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../../shared/toast.service';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(
    private toastSvc: ToastService,
    private alertCtrl: AlertController
  ) {}

  toast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary'
  ) {
    this.toastSvc.show(message, color);
  }

  async confirm(message: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'OK', role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }
}
