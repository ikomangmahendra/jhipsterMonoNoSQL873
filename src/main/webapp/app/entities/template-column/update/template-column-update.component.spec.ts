import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { TemplateColumnService } from '../service/template-column.service';
import { ITemplateColumn } from '../template-column.model';
import { TemplateColumnFormService } from './template-column-form.service';

import { TemplateColumnUpdateComponent } from './template-column-update.component';

describe('TemplateColumn Management Update Component', () => {
  let comp: TemplateColumnUpdateComponent;
  let fixture: ComponentFixture<TemplateColumnUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let templateColumnFormService: TemplateColumnFormService;
  let templateColumnService: TemplateColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TemplateColumnUpdateComponent],
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
      .overrideTemplate(TemplateColumnUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TemplateColumnUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    templateColumnFormService = TestBed.inject(TemplateColumnFormService);
    templateColumnService = TestBed.inject(TemplateColumnService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const templateColumn: ITemplateColumn = { id: 'dbde1be8-29d9-4e2f-b19f-2e6c4a588bce' };

      activatedRoute.data = of({ templateColumn });
      comp.ngOnInit();

      expect(comp.templateColumn).toEqual(templateColumn);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateColumn>>();
      const templateColumn = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
      jest.spyOn(templateColumnFormService, 'getTemplateColumn').mockReturnValue(templateColumn);
      jest.spyOn(templateColumnService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateColumn });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateColumn }));
      saveSubject.complete();

      // THEN
      expect(templateColumnFormService.getTemplateColumn).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(templateColumnService.update).toHaveBeenCalledWith(expect.objectContaining(templateColumn));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateColumn>>();
      const templateColumn = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
      jest.spyOn(templateColumnFormService, 'getTemplateColumn').mockReturnValue({ id: null });
      jest.spyOn(templateColumnService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateColumn: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateColumn }));
      saveSubject.complete();

      // THEN
      expect(templateColumnFormService.getTemplateColumn).toHaveBeenCalled();
      expect(templateColumnService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateColumn>>();
      const templateColumn = { id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' };
      jest.spyOn(templateColumnService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateColumn });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(templateColumnService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
