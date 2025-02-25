import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
