import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITemplateColumn } from '../template-column.model';

@Component({
  selector: 'jhi-template-column-detail',
  templateUrl: './template-column-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TemplateColumnDetailComponent {
  templateColumn = input<ITemplateColumn | null>(null);

  previousState(): void {
    window.history.back();
  }
}
