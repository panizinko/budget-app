import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Checklist } from '../../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  imports: [RouterModule],
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
        <li>
          <a routerLink="/checklist/{{ checklist.id }}">{{
            checklist.title
          }}</a>
          <div class="flex gap-2">
            <button (click)="edit.emit(checklist)">Edit</button>
            <button (click)="delete.emit(checklist.id)">Delete</button>
          </div>
        </li>
      } @empty {
        <li>No checklists found</li>
      }
    </ul>
  `,
  styles: ``,
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();

  edit = output<Checklist>();
  delete = output<Checklist['id']>();
}
