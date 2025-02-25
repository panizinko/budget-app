import { Component, input } from '@angular/core';
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
}
