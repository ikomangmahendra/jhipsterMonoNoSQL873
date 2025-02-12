import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../template-column.test-samples';

import { TemplateColumnFormService } from './template-column-form.service';

describe('TemplateColumn Form Service', () => {
  let service: TemplateColumnFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateColumnFormService);
  });

  describe('Service methods', () => {
    describe('createTemplateColumnFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTemplateColumnFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            templateName: expect.any(Object),
          }),
        );
      });

      it('passing ITemplateColumn should create a new form with FormGroup', () => {
        const formGroup = service.createTemplateColumnFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            templateName: expect.any(Object),
          }),
        );
      });
    });

    describe('getTemplateColumn', () => {
      it('should return NewTemplateColumn for default TemplateColumn initial value', () => {
        const formGroup = service.createTemplateColumnFormGroup(sampleWithNewData);

        const templateColumn = service.getTemplateColumn(formGroup) as any;

        expect(templateColumn).toMatchObject(sampleWithNewData);
      });

      it('should return NewTemplateColumn for empty TemplateColumn initial value', () => {
        const formGroup = service.createTemplateColumnFormGroup();

        const templateColumn = service.getTemplateColumn(formGroup) as any;

        expect(templateColumn).toMatchObject({});
      });

      it('should return ITemplateColumn', () => {
        const formGroup = service.createTemplateColumnFormGroup(sampleWithRequiredData);

        const templateColumn = service.getTemplateColumn(formGroup) as any;

        expect(templateColumn).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITemplateColumn should not enable id FormControl', () => {
        const formGroup = service.createTemplateColumnFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTemplateColumn should disable id FormControl', () => {
        const formGroup = service.createTemplateColumnFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
