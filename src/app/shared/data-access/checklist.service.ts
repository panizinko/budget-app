import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { AddChecklist, type Checklist } from '../interfaces/checklist';

export interface ChecklistState {
  checklists: Checklist[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  // state
  private state = signal<ChecklistState>({
    checklists: [],
  });

  // selectors
  checklists = computed(() => this.state().checklists);

  // actions
  add$ = new Subject<AddChecklist>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      })),
    );
  }

  private addIdToChecklist(checklist: AddChecklist): Checklist {
    return { ...checklist, id: this.generateSlug(checklist.title) };
  }

  private generateSlug(title: string): string {
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const matchingSlugs = this.checklists().find(
      (checklist) => checklist.id === slug,
    );

    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
