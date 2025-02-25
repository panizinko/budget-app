import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChecklistService } from '../../shared/data-access/checklist.service';
import type { Checklist } from '../../shared/interfaces/checklist';
import { ModalFormComponent } from '../../shared/ui/modal-form.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { ChecklistListComponent } from './ui/checklist-list.component';

@Component({
  selector: 'app-checklists',
  imports: [
    MatIconModule,
    MatButtonModule,
    ModalComponent,
    ModalFormComponent,
    ChecklistListComponent,
  ],
  template: `
    <main>
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <h1 class="bold text-3xl">Checklists</h1>
        <button mat-fab extended (click)="checklistBeingEdited.set({})">
          <mat-icon>add</mat-icon>
          Add checklist
        </button>
      </header>

      <section>
        <app-checklist-list [checklists]="checklistService.checklists()" />
      </section>
    </main>

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-modal-form
          [title]="checklistBeingEdited()?.title || 'Add Checklist'"
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
          (save)="checklistService.add$.next(checklistForm.getRawValue())"
        ></app-modal-form>
      </ng-template>
    </app-modal>
  `,
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        background: var(--color-light);
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 1rem;

        button {
          margin-left: 1rem;
        }
      }
    `,
  ],
})
export default class ChecklistsComponent {
  fb = inject(FormBuilder);
  checklistService = inject(ChecklistService);

  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.fb.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited();

      if (!checklist) {
        this.checklistForm.reset();
      }
    });
  }
}
