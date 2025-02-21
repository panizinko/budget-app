import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  readonly isExpanded = signal(true);

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }

  closeSidebar() {
    this.isExpanded.set(false);
  }
}
