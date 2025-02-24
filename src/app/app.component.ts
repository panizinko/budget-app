import { Component, inject } from '@angular/core';
import { AUTH, FIRESTORE } from './app.config';
import { ShellComponent } from './common/ui/shell/shell.component';

@Component({
  selector: 'app-root',
  imports: [ShellComponent],
  template: ` <app-shell></app-shell> `,
  styles: '',
})
export class AppComponent {
  auth = inject(AUTH);
  firestore = inject(FIRESTORE);

  constructor() {
    console.log('firebase auth', this.auth);
    console.log('firebase firestore', this.firestore);
  }
}
