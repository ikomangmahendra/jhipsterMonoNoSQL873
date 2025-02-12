import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITemplateColumn, NewTemplateColumn } from '../template-column.model';

export type PartialUpdateTemplateColumn = Partial<ITemplateColumn> & Pick<ITemplateColumn, 'id'>;

export type EntityResponseType = HttpResponse<ITemplateColumn>;
export type EntityArrayResponseType = HttpResponse<ITemplateColumn[]>;

@Injectable({ providedIn: 'root' })
export class TemplateColumnService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/template-columns');

  create(templateColumn: NewTemplateColumn): Observable<EntityResponseType> {
    return this.http.post<ITemplateColumn>(this.resourceUrl, templateColumn, { observe: 'response' });
  }

  update(templateColumn: ITemplateColumn): Observable<EntityResponseType> {
    return this.http.put<ITemplateColumn>(`${this.resourceUrl}/${this.getTemplateColumnIdentifier(templateColumn)}`, templateColumn, {
      observe: 'response',
    });
  }

  partialUpdate(templateColumn: PartialUpdateTemplateColumn): Observable<EntityResponseType> {
    return this.http.patch<ITemplateColumn>(`${this.resourceUrl}/${this.getTemplateColumnIdentifier(templateColumn)}`, templateColumn, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITemplateColumn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITemplateColumn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTemplateColumnIdentifier(templateColumn: Pick<ITemplateColumn, 'id'>): string {
    return templateColumn.id;
  }

  compareTemplateColumn(o1: Pick<ITemplateColumn, 'id'> | null, o2: Pick<ITemplateColumn, 'id'> | null): boolean {
    return o1 && o2 ? this.getTemplateColumnIdentifier(o1) === this.getTemplateColumnIdentifier(o2) : o1 === o2;
  }

  addTemplateColumnToCollectionIfMissing<Type extends Pick<ITemplateColumn, 'id'>>(
    templateColumnCollection: Type[],
    ...templateColumnsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const templateColumns: Type[] = templateColumnsToCheck.filter(isPresent);
    if (templateColumns.length > 0) {
      const templateColumnCollectionIdentifiers = templateColumnCollection.map(templateColumnItem =>
        this.getTemplateColumnIdentifier(templateColumnItem),
      );
      const templateColumnsToAdd = templateColumns.filter(templateColumnItem => {
        const templateColumnIdentifier = this.getTemplateColumnIdentifier(templateColumnItem);
        if (templateColumnCollectionIdentifiers.includes(templateColumnIdentifier)) {
          return false;
        }
        templateColumnCollectionIdentifiers.push(templateColumnIdentifier);
        return true;
      });
      return [...templateColumnsToAdd, ...templateColumnCollection];
    }
    return templateColumnCollection;
  }
}
