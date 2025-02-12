import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITemplateColumn } from '../template-column.model';
import { TemplateColumnService } from '../service/template-column.service';

@Component({
  templateUrl: './template-column-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TemplateColumnDeleteDialogComponent {
  templateColumn?: ITemplateColumn;

  protected templateColumnService = inject(TemplateColumnService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.templateColumnService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
