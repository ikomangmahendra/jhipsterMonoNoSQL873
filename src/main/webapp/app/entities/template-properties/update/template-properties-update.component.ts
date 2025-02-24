import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITemplateColumn } from 'app/entities/template-column/template-column.model';
import { TemplateColumnService } from 'app/entities/template-column/service/template-column.service';
import { ITemplateProperties } from '../template-properties.model';
import { TemplatePropertiesService } from '../service/template-properties.service';
import { TemplatePropertiesFormGroup, TemplatePropertiesFormService } from './template-properties-form.service';

@Component({
  selector: 'jhi-template-properties-update',
  templateUrl: './template-properties-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TemplatePropertiesUpdateComponent implements OnInit {
  isSaving = false;
  templateProperties: ITemplateProperties | null = null;

  templateColumnsSharedCollection: ITemplateColumn[] = [];

  protected templatePropertiesService = inject(TemplatePropertiesService);
  protected templatePropertiesFormService = inject(TemplatePropertiesFormService);
  protected templateColumnService = inject(TemplateColumnService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TemplatePropertiesFormGroup = this.templatePropertiesFormService.createTemplatePropertiesFormGroup();

  compareTemplateColumn = (o1: ITemplateColumn | null, o2: ITemplateColumn | null): boolean =>
    this.templateColumnService.compareTemplateColumn(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateProperties }) => {
      this.templateProperties = templateProperties;
      if (templateProperties) {
        this.updateForm(templateProperties);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const templateProperties = this.templatePropertiesFormService.getTemplateProperties(this.editForm);
    if (templateProperties.id !== null) {
      this.subscribeToSaveResponse(this.templatePropertiesService.update(templateProperties));
    } else {
      this.subscribeToSaveResponse(this.templatePropertiesService.create(templateProperties));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplateProperties>>): void {
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

  protected updateForm(templateProperties: ITemplateProperties): void {
    this.templateProperties = templateProperties;
    this.templatePropertiesFormService.resetForm(this.editForm, templateProperties);

    this.templateColumnsSharedCollection = this.templateColumnService.addTemplateColumnToCollectionIfMissing<ITemplateColumn>(
      this.templateColumnsSharedCollection,
      templateProperties.templateColumn,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.templateColumnService
      .query()
      .pipe(map((res: HttpResponse<ITemplateColumn[]>) => res.body ?? []))
      .pipe(
        map((templateColumns: ITemplateColumn[]) =>
          this.templateColumnService.addTemplateColumnToCollectionIfMissing<ITemplateColumn>(
            templateColumns,
            this.templateProperties?.templateColumn,
          ),
        ),
      )
      .subscribe((templateColumns: ITemplateColumn[]) => (this.templateColumnsSharedCollection = templateColumns));
  }
}
