import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITemplateProperties } from '../template-properties.model';
import { TemplatePropertiesService } from '../service/template-properties.service';

const templatePropertiesResolve = (route: ActivatedRouteSnapshot): Observable<null | ITemplateProperties> => {
  const id = route.params.id;
  if (id) {
    return inject(TemplatePropertiesService)
      .find(id)
      .pipe(
        mergeMap((templateProperties: HttpResponse<ITemplateProperties>) => {
          if (templateProperties.body) {
            return of(templateProperties.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default templatePropertiesResolve;
