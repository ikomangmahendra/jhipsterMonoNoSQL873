import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITemplateProperties } from '../template-properties.model';
import { TemplatePropertiesService } from '../service/template-properties.service';

@Component({
  templateUrl: './template-properties-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TemplatePropertiesDeleteDialogComponent {
  templateProperties?: ITemplateProperties;

  protected templatePropertiesService = inject(TemplatePropertiesService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.templatePropertiesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
