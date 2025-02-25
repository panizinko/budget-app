import { Component, input, output } from '@angular/core';
import type {
  ChecklistItem,
  RemoveChecklistItem,
} from '../../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
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
}
