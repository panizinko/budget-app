// Use more information that just a title for either the checklist or checklist items. You can do whatever you like here, but as an example you might display the date the checklist was created, or maybe you can allow the user to supply a description for the checklist as well.
// Add some kind of indicator that shows how many items in a checklist are in the completed state (e.g. 5/7 complete)
// Add something to the interface on the home page that shows how many items each checklist has

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
        <app-checklist-list
          [checklists]="checklistService.checklists()"
          (delete)="checklistService.delete$.next($event)"
          (edit)="checklistBeingEdited.set($event)"
        />
      </section>
    </main>

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-modal-form
          [title]="checklistBeingEdited()?.title || 'Add Checklist'"
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
          (save)="
            checklistBeingEdited()?.id
              ? checklistService.edit$.next({
                  id: checklistBeingEdited()!.id!,
                  data: checklistForm.getRawValue(),
                })
              : checklistService.add$.next(checklistForm.getRawValue())
          "
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
      } else {
        this.checklistForm.patchValue({
          title: checklist.title,
        });
      }
    });
  }
}
