import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TemplatePropertiesDetailComponent } from './template-properties-detail.component';

describe('TemplateProperties Management Detail Component', () => {
  let comp: TemplatePropertiesDetailComponent;
  let fixture: ComponentFixture<TemplatePropertiesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePropertiesDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./template-properties-detail.component').then(m => m.TemplatePropertiesDetailComponent),
              resolve: { templateProperties: () => of({ id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TemplatePropertiesDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePropertiesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load templateProperties on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TemplatePropertiesDetailComponent);

      // THEN
      expect(instance.templateProperties()).toEqual(expect.objectContaining({ id: '3223eb3d-249a-4fbb-b963-d071b446dcb5' }));
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
