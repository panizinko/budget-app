import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export const isAuthenticatedGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.loggedIn()) {
      return true;
    }

    return router.parseUrl('auth/login');
  };
};
