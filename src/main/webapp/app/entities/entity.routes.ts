import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'Authorities' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'template-properties',
    data: { pageTitle: 'TemplateProperties' },
    loadChildren: () => import('./template-properties/template-properties.routes'),
  },
  {
    path: 'template-column',
    data: { pageTitle: 'TemplateColumns' },
    loadChildren: () => import('./template-column/template-column.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
