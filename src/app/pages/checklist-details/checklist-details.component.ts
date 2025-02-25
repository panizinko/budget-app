import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChecklistItemService } from '../../shared/data-access/checklist-item.service';
import { ChecklistService } from '../../shared/data-access/checklist.service';
import type { ChecklistItem } from '../../shared/interfaces/checklist-item';
import { ModalFormComponent } from '../../shared/ui/modal-form.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';
import { ChecklistItemListComponent } from './ui/checklist-item-list.component';

@Component({
  selector: 'app-checklist-details',
  imports: [
    ChecklistHeaderComponent,
    ModalComponent,
    ModalFormComponent,
    ChecklistItemListComponent,
  ],
  template: `
    @if (checklist(); as checklist) {
      <app-checklist-header
        [checklist]="checklist"
        (addItem)="checklistItemBeingEdited.set({})"
        (resetChecklistToggle)="checklistItemService.resetToggle$.next($event)"
      />

      <app-checklist-item-list
        [checklistItems]="items()"
        (toggle)="checklistItemService.toggle$.next($event)"
      />

      <app-modal [isOpen]="!!checklistItemBeingEdited()">
        <ng-template>
          <app-modal-form
            title="Create item"
            [formGroup]="checklistItemForm"
            (close)="checklistItemBeingEdited.set(null)"
            (save)="
              checklistItemService.add$.next({
                item: checklistItemForm.getRawValue(),
                checklistId: checklist.id,
              })
            "
          />
        </ng-template>
      </app-modal>
    } @else {
      <p>Checklist not found</p>
    }
  `,
  styles: ``,
})
export default class ChecklistDetailsComponent {
  checklistService = inject(ChecklistService);
  checklistItemService = inject(ChecklistItemService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id')),
  );

  items = computed(() =>
    this.checklistItemService
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id')),
  );

  checklistItemForm = this.fb.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklistItem = this.checklistItemBeingEdited();

      if (!checklistItem) {
        this.checklistItemForm.reset();
      }
    });
  }
}
