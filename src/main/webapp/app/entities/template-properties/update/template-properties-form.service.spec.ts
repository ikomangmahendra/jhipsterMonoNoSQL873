import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../template-properties.test-samples';

import { TemplatePropertiesFormService } from './template-properties-form.service';

describe('TemplateProperties Form Service', () => {
  let service: TemplatePropertiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatePropertiesFormService);
  });

  describe('Service methods', () => {
    describe('createTemplatePropertiesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTemplatePropertiesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            label: expect.any(Object),
            templateColumn: expect.any(Object),
          }),
        );
      });

      it('passing ITemplateProperties should create a new form with FormGroup', () => {
        const formGroup = service.createTemplatePropertiesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            label: expect.any(Object),
            templateColumn: expect.any(Object),
          }),
        );
      });
    });

    describe('getTemplateProperties', () => {
      it('should return NewTemplateProperties for default TemplateProperties initial value', () => {
        const formGroup = service.createTemplatePropertiesFormGroup(sampleWithNewData);

        const templateProperties = service.getTemplateProperties(formGroup) as any;

        expect(templateProperties).toMatchObject(sampleWithNewData);
      });

      it('should return NewTemplateProperties for empty TemplateProperties initial value', () => {
        const formGroup = service.createTemplatePropertiesFormGroup();

        const templateProperties = service.getTemplateProperties(formGroup) as any;

        expect(templateProperties).toMatchObject({});
      });

      it('should return ITemplateProperties', () => {
        const formGroup = service.createTemplatePropertiesFormGroup(sampleWithRequiredData);

        const templateProperties = service.getTemplateProperties(formGroup) as any;

        expect(templateProperties).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITemplateProperties should not enable id FormControl', () => {
        const formGroup = service.createTemplatePropertiesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTemplateProperties should disable id FormControl', () => {
        const formGroup = service.createTemplatePropertiesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
