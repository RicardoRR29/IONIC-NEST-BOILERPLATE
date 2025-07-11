import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../../shared/table/table.component';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, IonicModule, TableComponent],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() currentUser: User | null = null;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  columns = [
    { header: 'Nome', field: 'name' },
    { header: 'Email', field: 'email' },
  ];
}
