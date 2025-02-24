import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  #isExpanded = signal(true);

  isExpanded = this.#isExpanded.asReadonly();

  toggleSidebar() {
    this.#isExpanded.set(!this.#isExpanded());
  }

  closeSidebar() {
    this.#isExpanded.set(false);
  }
}
