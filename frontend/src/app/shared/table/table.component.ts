import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

export interface ColumnDefinition {
  header: string;
  field: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T = any> {
  @Input() columns: ColumnDefinition[] = [];
  @Input() data: T[] = [];
  @Input() showActions = false;

  // optional highlighting of a specific row based on a field value
  @Input() highlightField?: string;
  @Input() highlightValue?: unknown;
  @Input() badgeColumn?: string;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  getField(item: T, field: string): any {
    return (item as any)[field];
  }

  shouldHighlight(item: T): boolean {
    if (!this.highlightField || this.highlightValue === undefined) {
      return false;
    }
    return this.getField(item, this.highlightField) === this.highlightValue;
  }
}
