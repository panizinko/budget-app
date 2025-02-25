import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MediaQueryService } from '../data-access/media-query.service';
import { SidebarService } from '../data-access/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <mat-sidenav-container
      (backdropClick)="sidebarService.closeSidebar()"
      class="h-full"
    >
      <mat-sidenav
        #sidenav
        [disableClose]="true"
        [mode]="mediaQueryService.isMobile() ? 'over' : 'side'"
        [opened]="!mediaQueryService.isMobile() || sidebarService.isExpanded()"
        class="!w-64 bg-gray-900 text-white sm:!w-auto"
      >
        <mat-nav-list>
          @for (item of navItems; track item.icon) {
            <a
              mat-list-item
              [routerLink]="item.route"
              matTooltip="{{ item.label }}"
              (click)="sidebarService.closeSidebar()"
            >
              <div class="flex items-center gap-4">
                <mat-icon>{{ item.icon }}</mat-icon>
                @if (mediaQueryService.isMobile()) {
                  <span>{{ item.label }}</span>
                }
              </div>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
        <main class="mt-8 px-8">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);
  mediaQueryService = inject(MediaQueryService);

  constructor() {
    effect(() => {
      if (this.mediaQueryService.isMobile()) {
        this.sidebarService.closeSidebar();
      }
    });
  }

  navItems = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Checklists', route: '/checklists', icon: 'check' },
    { label: 'Expenses', route: '/expenses', icon: 'receipt' },
    { label: 'Income', route: '/income', icon: 'attach_money' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
  ];
}
