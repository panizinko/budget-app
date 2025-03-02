import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./shared/ui/shell.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: 'checklists',
        loadComponent: () => import('./pages/checklists/checklists.component'),
      },
      {
        path: 'checklist/:id',
        loadComponent: () =>
          import('./pages/checklist-details/checklist-details.component'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
