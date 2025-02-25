import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, NavbarComponent],
  template: `
    <app-sidebar>
      <app-navbar></app-navbar>
    </app-sidebar>
  `,
})
export class ShellComponent {}
