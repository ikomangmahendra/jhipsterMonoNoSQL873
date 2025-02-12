import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITemplateProperties } from '../template-properties.model';

@Component({
  selector: 'jhi-template-properties-detail',
  templateUrl: './template-properties-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TemplatePropertiesDetailComponent {
  templateProperties = input<ITemplateProperties | null>(null);

  previousState(): void {
    window.history.back();
  }
}
