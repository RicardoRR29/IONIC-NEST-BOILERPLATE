import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent {
  @Input() total = 0;
  @Input() currentUser: User | null = null;
}
