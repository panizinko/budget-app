import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import {
  AddChecklist,
  type Checklist,
  type EditChecklist,
} from '../interfaces/checklist';
import { ChecklistItemService } from './checklist-item.service';
import { LocalStorageService } from './local-storage.service';

export interface ChecklistState {
  checklists: Checklist[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  localStorageService = inject(LocalStorageService);
  checklistItemService = inject(ChecklistItemService);

  // state
  private state = signal<ChecklistState>({
    checklists: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklists = computed(() => this.state().checklists);
  loaded = computed(() => this.state().loaded);

  // actions
  add$ = new Subject<AddChecklist>();
  edit$ = new Subject<EditChecklist>();
  delete$ = this.checklistItemService.checklistDelete$;
  checklistLoaded$ = this.localStorageService.loadChecklists();

  constructor() {
    effect(() => {
      if (this.loaded()) {
        this.localStorageService.saveChecklists(this.checklists());
      }
    });

    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      })),
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((checklistItems) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === checklistItems.id
            ? { ...checklist, ...checklistItems.data }
            : checklist,
        ),
      })),
    );

    this.delete$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.filter((checklist) => checklist.id !== id),
      })),
    );

    this.checklistLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklists) =>
        this.state.update((state) => ({
          ...state,
          checklists,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });
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
