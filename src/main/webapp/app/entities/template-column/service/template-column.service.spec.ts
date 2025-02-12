import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITemplateColumn } from '../template-column.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../template-column.test-samples';

import { TemplateColumnService } from './template-column.service';

const requireRestSample: ITemplateColumn = {
  ...sampleWithRequiredData,
};

describe('TemplateColumn Service', () => {
  let service: TemplateColumnService;
  let httpMock: HttpTestingController;
  let expectedResult: ITemplateColumn | ITemplateColumn[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TemplateColumnService);
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

    it('should create a TemplateColumn', () => {
      const templateColumn = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(templateColumn).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TemplateColumn', () => {
      const templateColumn = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(templateColumn).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TemplateColumn', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TemplateColumn', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TemplateColumn', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTemplateColumnToCollectionIfMissing', () => {
      it('should add a TemplateColumn to an empty array', () => {
        const templateColumn: ITemplateColumn = sampleWithRequiredData;
        expectedResult = service.addTemplateColumnToCollectionIfMissing([], templateColumn);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateColumn);
      });

      it('should not add a TemplateColumn to an array that contains it', () => {
        const templateColumn: ITemplateColumn = sampleWithRequiredData;
        const templateColumnCollection: ITemplateColumn[] = [
          {
            ...templateColumn,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTemplateColumnToCollectionIfMissing(templateColumnCollection, templateColumn);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TemplateColumn to an array that doesn't contain it", () => {
        const templateColumn: ITemplateColumn = sampleWithRequiredData;
        const templateColumnCollection: ITemplateColumn[] = [sampleWithPartialData];
        expectedResult = service.addTemplateColumnToCollectionIfMissing(templateColumnCollection, templateColumn);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateColumn);
      });

      it('should add only unique TemplateColumn to an array', () => {
        const templateColumnArray: ITemplateColumn[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const templateColumnCollection: ITemplateColumn[] = [sampleWithRequiredData];
        expectedResult = service.addTemplateColumnToCollectionIfMissing(templateColumnCollection, ...templateColumnArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const templateColumn: ITemplateColumn = sampleWithRequiredData;
        const templateColumn2: ITemplateColumn = sampleWithPartialData;
        expectedResult = service.addTemplateColumnToCollectionIfMissing([], templateColumn, templateColumn2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(templateColumn);
        expect(expectedResult).toContain(templateColumn2);
      });

      it('should accept null and undefined values', () => {
        const templateColumn: ITemplateColumn = sampleWithRequiredData;
        expectedResult = service.addTemplateColumnToCollectionIfMissing([], null, templateColumn, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(templateColumn);
      });

      it('should return initial array if no TemplateColumn is added', () => {
        const templateColumnCollection: ITemplateColumn[] = [sampleWithRequiredData];
        expectedResult = service.addTemplateColumnToCollectionIfMissing(templateColumnCollection, undefined, null);
        expect(expectedResult).toEqual(templateColumnCollection);
      });
    });

    describe('compareTemplateColumn', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTemplateColumn(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
        const entity2 = null;

        const compareResult1 = service.compareTemplateColumn(entity1, entity2);
        const compareResult2 = service.compareTemplateColumn(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
        const entity2 = { id: 'dbde1be8-29d9-4e2f-b19f-2e6c4a588bce' };

        const compareResult1 = service.compareTemplateColumn(entity1, entity2);
        const compareResult2 = service.compareTemplateColumn(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
        const entity2 = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };

        const compareResult1 = service.compareTemplateColumn(entity1, entity2);
        const compareResult2 = service.compareTemplateColumn(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
