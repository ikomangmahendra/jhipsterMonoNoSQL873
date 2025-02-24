import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITemplateProperties } from '../template-properties.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../template-properties.test-samples';

import { TemplatePropertiesService } from './template-properties.service';

const requireRestSample: ITemplateProperties = {
  ...sampleWithRequiredData,
};

describe('TemplateProperties Service', () => {
  let service: TemplatePropertiesService;
  let httpMock: HttpTestingController;
  let expectedResult: ITemplateProperties | ITemplateProperties[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TemplatePropertiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TemplateProperties', () => {
      const templateProperties = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(templateProperties).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TemplateProperties', () => {
      const templateProperties = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(templateProperties).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TemplateProperties', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TemplateProperties', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TemplateProperties', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTemplatePropertiesToCollectionIfMissing', () => {
      it('should add a TemplateProperties to an empty array', () => {
        const templateProperties: ITemplateProperties = sampleWithRequiredData;
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing([], templateProperties);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateProperties);
      });

      it('should not add a TemplateProperties to an array that contains it', () => {
        const templateProperties: ITemplateProperties = sampleWithRequiredData;
        const templatePropertiesCollection: ITemplateProperties[] = [
          {
            ...templateProperties,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing(templatePropertiesCollection, templateProperties);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TemplateProperties to an array that doesn't contain it", () => {
        const templateProperties: ITemplateProperties = sampleWithRequiredData;
        const templatePropertiesCollection: ITemplateProperties[] = [sampleWithPartialData];
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing(templatePropertiesCollection, templateProperties);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateProperties);
      });

      it('should add only unique TemplateProperties to an array', () => {
        const templatePropertiesArray: ITemplateProperties[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const templatePropertiesCollection: ITemplateProperties[] = [sampleWithRequiredData];
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing(templatePropertiesCollection, ...templatePropertiesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const templateProperties: ITemplateProperties = sampleWithRequiredData;
        const templateProperties2: ITemplateProperties = sampleWithPartialData;
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing([], templateProperties, templateProperties2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateProperties);
        expect(expectedResult).toContain(templateProperties2);
      });

      it('should accept null and undefined values', () => {
        const templateProperties: ITemplateProperties = sampleWithRequiredData;
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing([], null, templateProperties, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateProperties);
      });

      it('should return initial array if no TemplateProperties is added', () => {
        const templatePropertiesCollection: ITemplateProperties[] = [sampleWithRequiredData];
        expectedResult = service.addTemplatePropertiesToCollectionIfMissing(templatePropertiesCollection, undefined, null);
        expect(expectedResult).toEqual(templatePropertiesCollection);
      });
    });

    describe('compareTemplateProperties', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTemplateProperties(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
        const entity2 = null;

        const compareResult1 = service.compareTemplateProperties(entity1, entity2);
        const compareResult2 = service.compareTemplateProperties(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
        const entity2 = { id: '63dc299b-fd9a-4c2b-82fb-9ea917b7e57f' };

        const compareResult1 = service.compareTemplateProperties(entity1, entity2);
        const compareResult2 = service.compareTemplateProperties(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
        const entity2 = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };

        const compareResult1 = service.compareTemplateProperties(entity1, entity2);
        const compareResult2 = service.compareTemplateProperties(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
