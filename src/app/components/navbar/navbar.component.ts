import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MediaQueryService } from '../../services/media-query.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <mat-toolbar color="primary" class="flex justify-between px-4">
      <div class="flex items-center gap-4">
        @if (mediaQueryService.isMobile()) {
          <button mat-icon-button (click)="sidebarService.toggleSidebar()">
            <mat-icon>menu</mat-icon>
          </button>
        }
        <span class="text-xl font-bold">📊 Budget Dashboard</span>
      </div>
      <div class="flex items-center gap-4">
        @for (item of toolbarItems; track item) {
          <button mat-icon-button matTooltip="{{ item.label }}">
            <mat-icon>{{ item.icon }}</mat-icon>
          </button>
        }
      </div>
    </mat-toolbar>
  `,
})
export class NavbarComponent {
  sidebarService = inject(SidebarService);
  mediaQueryService = inject(MediaQueryService);

  toolbarItems = [
    { label: 'Notifications', icon: 'notifications' },
    { label: 'Logout', icon: 'logout' },
  ];
}
