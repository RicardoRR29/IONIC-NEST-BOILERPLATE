import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';
import { AddUserModalComponent } from './components/add-user/add-user-modal.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    AddUserModalComponent,
    EditUserModalComponent,
  ],
})
export class UsersModule {}
