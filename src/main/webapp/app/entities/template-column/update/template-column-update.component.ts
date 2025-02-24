import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITemplateColumn } from '../template-column.model';
import { TemplateColumnService } from '../service/template-column.service';
import { TemplateColumnFormGroup, TemplateColumnFormService } from './template-column-form.service';

@Component({
  selector: 'jhi-template-column-update',
  templateUrl: './template-column-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TemplateColumnUpdateComponent implements OnInit {
  isSaving = false;
  templateColumn: ITemplateColumn | null = null;

  protected templateColumnService = inject(TemplateColumnService);
  protected templateColumnFormService = inject(TemplateColumnFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TemplateColumnFormGroup = this.templateColumnFormService.createTemplateColumnFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateColumn }) => {
      this.templateColumn = templateColumn;
      if (templateColumn) {
        this.updateForm(templateColumn);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const templateColumn = this.templateColumnFormService.getTemplateColumn(this.editForm);
    if (templateColumn.id !== null) {
      this.subscribeToSaveResponse(this.templateColumnService.update(templateColumn));
    } else {
      this.subscribeToSaveResponse(this.templateColumnService.create(templateColumn));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplateColumn>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(templateColumn: ITemplateColumn): void {
    this.templateColumn = templateColumn;
    this.templateColumnFormService.resetForm(this.editForm, templateColumn);
  }
}
