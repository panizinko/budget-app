import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type {
  ChecklistItem,
  RemoveChecklistItem,
} from '../../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  imports: [MatButtonModule],
  template: `
    <section>
      <ul>
        @for (item of checklistItems(); track item.id) {
          <li>
            <div class="flex gap-4">
              @if (item.checked) {
                <span>✅</span>
              }
              <button (click)="toggle.emit(item.id)">{{ item.title }}</button>
            </div>
            <div class="flex gap-2">
              <button mat-button (click)="edit.emit(item)">Edit</button>
              <button mat-button (click)="delete.emit(item.id)">Delete</button>
            </div>
          </li>
        } @empty {
          <li>No checklists found</li>
        }
      </ul>
    </section>
  `,
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<RemoveChecklistItem>();

  edit = output<ChecklistItem>();
  delete = output<ChecklistItem['id']>();
}
