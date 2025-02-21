import { Component } from '@angular/core';
import { ShellComponent } from './components/shell/shell.component';

@Component({
  selector: 'app-root',
  imports: [ShellComponent],
  template: ` <app-shell></app-shell> `,
  styles: '',
})
export class AppComponent {}
