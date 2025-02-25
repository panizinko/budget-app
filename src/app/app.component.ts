import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/data-access/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: '',
})
export class AppComponent {
  // private auth = inject(AUTH);
  // private firestore = inject(FIRESTORE);
  private router = inject(Router);

  public authService = inject(AuthService);

  constructor() {
    // console.log('firebase auth', this.auth);
    // console.log('firebase firestore', this.firestore);

    effect(() => {
      if (!this.authService.loggedIn()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
