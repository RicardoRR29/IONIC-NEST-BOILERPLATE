import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { AddUserModalComponent } from '../add-user/add-user-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    AddUserModalComponent,
  ],
})
export class RegisterPage implements AfterViewInit {
  @ViewChild(AddUserModalComponent) modal!: AddUserModalComponent;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.modal.open();
  }

  handleCreated() {
    this.router.navigateByUrl('/login');
  }
}
