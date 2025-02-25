import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import type { Checklist } from '../../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <header>
      <a routerLink="/checklists">Back</a>
      <h1>
        {{ checklist().title }}
      </h1>
      <div class="flex gap-4">
        <button
          mat-fab
          extended
          (click)="resetChecklistToggle.emit(checklist().id)"
        >
          <mat-icon>indeterminate_check_box</mat-icon>
          Reset toggle
        </button>
        <button mat-fab extended (click)="addItem.emit()">
          <mat-icon>add</mat-icon>
          Add checklist item
        </button>
      </div>
    </header>
  `,
  styles: ``,
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  resetChecklistToggle = output<Checklist['id']>();

  addItem = output();
}
