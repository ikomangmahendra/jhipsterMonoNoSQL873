import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITemplateProperties, NewTemplateProperties } from '../template-properties.model';

export type PartialUpdateTemplateProperties = Partial<ITemplateProperties> & Pick<ITemplateProperties, 'id'>;

export type EntityResponseType = HttpResponse<ITemplateProperties>;
export type EntityArrayResponseType = HttpResponse<ITemplateProperties[]>;

@Injectable({ providedIn: 'root' })
export class TemplatePropertiesService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/template-properties');

  create(templateProperties: NewTemplateProperties): Observable<EntityResponseType> {
    return this.http.post<ITemplateProperties>(this.resourceUrl, templateProperties, { observe: 'response' });
  }

  update(templateProperties: ITemplateProperties): Observable<EntityResponseType> {
    return this.http.put<ITemplateProperties>(
      `${this.resourceUrl}/${this.getTemplatePropertiesIdentifier(templateProperties)}`,
      templateProperties,
      { observe: 'response' },
    );
  }

  partialUpdate(templateProperties: PartialUpdateTemplateProperties): Observable<EntityResponseType> {
    return this.http.patch<ITemplateProperties>(
      `${this.resourceUrl}/${this.getTemplatePropertiesIdentifier(templateProperties)}`,
      templateProperties,
      { observe: 'response' },
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITemplateProperties>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITemplateProperties[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTemplatePropertiesIdentifier(templateProperties: Pick<ITemplateProperties, 'id'>): string {
    return templateProperties.id;
  }

  compareTemplateProperties(o1: Pick<ITemplateProperties, 'id'> | null, o2: Pick<ITemplateProperties, 'id'> | null): boolean {
    return o1 && o2 ? this.getTemplatePropertiesIdentifier(o1) === this.getTemplatePropertiesIdentifier(o2) : o1 === o2;
  }

  addTemplatePropertiesToCollectionIfMissing<Type extends Pick<ITemplateProperties, 'id'>>(
    templatePropertiesCollection: Type[],
    ...templatePropertiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const templateProperties: Type[] = templatePropertiesToCheck.filter(isPresent);
    if (templateProperties.length > 0) {
      const templatePropertiesCollectionIdentifiers = templatePropertiesCollection.map(templatePropertiesItem =>
        this.getTemplatePropertiesIdentifier(templatePropertiesItem),
      );
      const templatePropertiesToAdd = templateProperties.filter(templatePropertiesItem => {
        const templatePropertiesIdentifier = this.getTemplatePropertiesIdentifier(templatePropertiesItem);
        if (templatePropertiesCollectionIdentifiers.includes(templatePropertiesIdentifier)) {
          return false;
        }
        templatePropertiesCollectionIdentifiers.push(templatePropertiesIdentifier);
        return true;
      });
      return [...templatePropertiesToAdd, ...templatePropertiesCollection];
    }
    return templatePropertiesCollection;
  }
}
