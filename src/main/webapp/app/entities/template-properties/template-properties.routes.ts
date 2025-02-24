import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import TemplatePropertiesResolve from './route/template-properties-routing-resolve.service';

const templatePropertiesRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/template-properties.component').then(m => m.TemplatePropertiesComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/template-properties-detail.component').then(m => m.TemplatePropertiesDetailComponent),
    resolve: {
      templateProperties: TemplatePropertiesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/template-properties-update.component').then(m => m.TemplatePropertiesUpdateComponent),
    resolve: {
      templateProperties: TemplatePropertiesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/template-properties-update.component').then(m => m.TemplatePropertiesUpdateComponent),
    resolve: {
      templateProperties: TemplatePropertiesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default templatePropertiesRoute;
