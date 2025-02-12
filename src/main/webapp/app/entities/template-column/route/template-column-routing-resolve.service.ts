import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITemplateColumn } from '../template-column.model';
import { TemplateColumnService } from '../service/template-column.service';

const templateColumnResolve = (route: ActivatedRouteSnapshot): Observable<null | ITemplateColumn> => {
  const id = route.params.id;
  if (id) {
    return inject(TemplateColumnService)
      .find(id)
      .pipe(
        mergeMap((templateColumn: HttpResponse<ITemplateColumn>) => {
          if (templateColumn.body) {
            return of(templateColumn.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default templateColumnResolve;
