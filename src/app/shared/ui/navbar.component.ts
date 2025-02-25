import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../data-access/auth.service';
import { MediaQueryService } from '../data-access/media-query.service';
import { SidebarService } from '../data-access/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <mat-toolbar color="primary" class="flex justify-between !px-8">
      <div class="flex items-center gap-4">
        @if (mediaQueryService.isMobile()) {
          <button mat-icon-button (click)="sidebarService.toggleSidebar()">
            <mat-icon>menu</mat-icon>
          </button>
        }
        <span class="text-xl font-bold">📊 Budget App</span>
      </div>
      <div class="flex items-center gap-4">
        <button mat-icon-button matTooltip="Notifications">
          <mat-icon>notifications</mat-icon>
        </button>

        <button
          mat-icon-button
          matTooltip="Logout"
          (click)="authService.logout()"
        >
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
})
export class NavbarComponent {
  sidebarService = inject(SidebarService);
  mediaQueryService = inject(MediaQueryService);

  authService = inject(AuthService);
}
