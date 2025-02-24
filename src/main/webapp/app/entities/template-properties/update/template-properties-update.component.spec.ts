import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITemplateColumn } from 'app/entities/template-column/template-column.model';
import { TemplateColumnService } from 'app/entities/template-column/service/template-column.service';
import { TemplatePropertiesService } from '../service/template-properties.service';
import { ITemplateProperties } from '../template-properties.model';
import { TemplatePropertiesFormService } from './template-properties-form.service';

import { TemplatePropertiesUpdateComponent } from './template-properties-update.component';

describe('TemplateProperties Management Update Component', () => {
  let comp: TemplatePropertiesUpdateComponent;
  let fixture: ComponentFixture<TemplatePropertiesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let templatePropertiesFormService: TemplatePropertiesFormService;
  let templatePropertiesService: TemplatePropertiesService;
  let templateColumnService: TemplateColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TemplatePropertiesUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TemplatePropertiesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TemplatePropertiesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    templatePropertiesFormService = TestBed.inject(TemplatePropertiesFormService);
    templatePropertiesService = TestBed.inject(TemplatePropertiesService);
    templateColumnService = TestBed.inject(TemplateColumnService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TemplateColumn query and add missing value', () => {
      const templateProperties: ITemplateProperties = { id: '63dc299b-fd9a-4c2b-82fb-9ea917b7e57f' };
      const templateColumn: ITemplateColumn = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
      templateProperties.templateColumn = templateColumn;

      const templateColumnCollection: ITemplateColumn[] = [{ id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' }];
      jest.spyOn(templateColumnService, 'query').mockReturnValue(of(new HttpResponse({ body: templateColumnCollection })));
      const additionalTemplateColumns = [templateColumn];
      const expectedCollection: ITemplateColumn[] = [...additionalTemplateColumns, ...templateColumnCollection];
      jest.spyOn(templateColumnService, 'addTemplateColumnToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ templateProperties });
      comp.ngOnInit();

      expect(templateColumnService.query).toHaveBeenCalled();
      expect(templateColumnService.addTemplateColumnToCollectionIfMissing).toHaveBeenCalledWith(
        templateColumnCollection,
        ...additionalTemplateColumns.map(expect.objectContaining),
      );
      expect(comp.templateColumnsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const templateProperties: ITemplateProperties = { id: '63dc299b-fd9a-4c2b-82fb-9ea917b7e57f' };
      const templateColumn: ITemplateColumn = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
      templateProperties.templateColumn = templateColumn;

      activatedRoute.data = of({ templateProperties });
      comp.ngOnInit();

      expect(comp.templateColumnsSharedCollection).toContainEqual(templateColumn);
      expect(comp.templateProperties).toEqual(templateProperties);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateProperties>>();
      const templateProperties = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
      jest.spyOn(templatePropertiesFormService, 'getTemplateProperties').mockReturnValue(templateProperties);
      jest.spyOn(templatePropertiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateProperties });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateProperties }));
      saveSubject.complete();

      // THEN
      expect(templatePropertiesFormService.getTemplateProperties).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(templatePropertiesService.update).toHaveBeenCalledWith(expect.objectContaining(templateProperties));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateProperties>>();
      const templateProperties = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
      jest.spyOn(templatePropertiesFormService, 'getTemplateProperties').mockReturnValue({ id: null });
      jest.spyOn(templatePropertiesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateProperties: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateProperties }));
      saveSubject.complete();

      // THEN
      expect(templatePropertiesFormService.getTemplateProperties).toHaveBeenCalled();
      expect(templatePropertiesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateProperties>>();
      const templateProperties = { id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' };
      jest.spyOn(templatePropertiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateProperties });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(templatePropertiesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTemplateColumn', () => {
      it('Should forward to templateColumnService', () => {
        const entity = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
        const entity2 = { id: 'dbde1be8-29d9-4e2f-b19f-2e6c4a588bce' };
        jest.spyOn(templateColumnService, 'compareTemplateColumn');
        comp.compareTemplateColumn(entity, entity2);
        expect(templateColumnService.compareTemplateColumn).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
