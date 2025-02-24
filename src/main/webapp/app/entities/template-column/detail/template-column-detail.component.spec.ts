import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TemplateColumnDetailComponent } from './template-column-detail.component';

describe('TemplateColumn Management Detail Component', () => {
  let comp: TemplateColumnDetailComponent;
  let fixture: ComponentFixture<TemplateColumnDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateColumnDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./template-column-detail.component').then(m => m.TemplateColumnDetailComponent),
              resolve: { templateColumn: () => of({ id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TemplateColumnDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateColumnDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load templateColumn on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TemplateColumnDetailComponent);

      // THEN
      expect(instance.templateColumn()).toEqual(expect.objectContaining({ id: '73dc6e86-f6d2-48c4-80dc-e41d1ae580be' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
