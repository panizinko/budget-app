import { Component, effect, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/data-access/auth.service';
import { LoginService } from '../../../shared/data-access/login.service';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  template: `
    <div class="gradient-bg container">
      @if (authService.loggedIn() === null) {
        <app-login-form
          [loginStatus]="loginService.status()"
          (login)="loginService.login$.next($event)"
        />
        <a routerLink="/auth/register">Create account</a>
      } @else {
        <mat-spinner diameter="50" />
      }
    </div>
  `,
  providers: [LoginService],
  imports: [RouterModule, LoginFormComponent, MatProgressSpinnerModule],
  styles: [
    `
      a {
        margin: 2rem;
        color: var(--color-dark);
      }
    `,
  ],
})
export default class LoginComponent {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.loggedIn()) {
        this.router.navigate(['/']);
      }
    });
  }
}
