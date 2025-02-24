import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import TemplateColumnResolve from './route/template-column-routing-resolve.service';

const templateColumnRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/template-column.component').then(m => m.TemplateColumnComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/template-column-detail.component').then(m => m.TemplateColumnDetailComponent),
    resolve: {
      templateColumn: TemplateColumnResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/template-column-update.component').then(m => m.TemplateColumnUpdateComponent),
    resolve: {
      templateColumn: TemplateColumnResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/template-column-update.component').then(m => m.TemplateColumnUpdateComponent),
    resolve: {
      templateColumn: TemplateColumnResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default templateColumnRoute;
