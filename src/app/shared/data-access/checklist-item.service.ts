import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import type { Checklist } from '../interfaces/checklist';
import type {
  AddChecklistItem,
  ChecklistItem,
  EditChecklistItem,
  RemoveChecklistItem,
} from '../interfaces/checklist-item';
import { LocalStorageService } from './local-storage.service';

export interface ChecklistItemState {
  checklistItems: ChecklistItem[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  localStorageService = inject(LocalStorageService);

  // state
  private state = signal<ChecklistItemState>({
    checklistItems: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);
  loaded = computed(() => this.state().loaded);

  // actions
  add$ = new Subject<AddChecklistItem>();
  edit$ = new Subject<EditChecklistItem>();
  delete$ = new Subject<RemoveChecklistItem>();
  checklistItemsLoaded$ = this.localStorageService.loadChecklistItems();
  checklistDelete$ = new Subject<Checklist['id']>();
  toggle$ = new Subject<string>();
  resetToggle$ = new Subject<Checklist['id']>();

  constructor() {
    effect(() => {
      if (this.loaded()) {
        this.localStorageService.saveChecklistItems(this.checklistItems());
      }
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: Date.now().toString(),
            checklistId: checklistItem.checklistId,
            checked: false,
          },
        ],
      })),
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === checklistItem.id
            ? { ...item, ...checklistItem.data }
            : item,
        ),
      })),
    );

    this.delete$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter((item) => item.id !== id),
      })),
    );

    this.checklistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklistItems) =>
        this.state.update((state) => ({
          ...state,
          checklistItems,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.checklistDelete$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter(
          (item) => item.checklistId !== checklistId,
        ),
      })),
    );

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      })),
    );

    this.resetToggle$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.checklistId === checklistId ? { ...item, checked: false } : item,
        ),
      })),
    );
  }
}
