import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/data-access/auth.service';
import { RegisterService } from '../../../shared/data-access/register.service';
import { RegisterFormComponent } from './ui/register-form.component';

@Component({
  selector: 'app-register',
  template: `
    <div class="gradient-bg container">
      <app-register-form
        [status]="registerService.status()"
        (register)="registerService.createUser$.next($event)"
      />
    </div>
  `,
  providers: [RegisterService],
  imports: [RegisterFormComponent],
})
export default class RegisterComponent {
  public registerService = inject(RegisterService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.loggedIn()) {
        this.router.navigate(['']);
      }
    });
  }
}
