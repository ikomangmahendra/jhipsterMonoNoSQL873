import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITemplateColumn, NewTemplateColumn } from '../template-column.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITemplateColumn for edit and NewTemplateColumnFormGroupInput for create.
 */
type TemplateColumnFormGroupInput = ITemplateColumn | PartialWithRequiredKeyOf<NewTemplateColumn>;

type TemplateColumnFormDefaults = Pick<NewTemplateColumn, 'id'>;

type TemplateColumnFormGroupContent = {
  id: FormControl<ITemplateColumn['id'] | NewTemplateColumn['id']>;
  templateName: FormControl<ITemplateColumn['templateName']>;
};

export type TemplateColumnFormGroup = FormGroup<TemplateColumnFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TemplateColumnFormService {
  createTemplateColumnFormGroup(templateColumn: TemplateColumnFormGroupInput = { id: null }): TemplateColumnFormGroup {
    const templateColumnRawValue = {
      ...this.getFormDefaults(),
      ...templateColumn,
    };
    return new FormGroup<TemplateColumnFormGroupContent>({
      id: new FormControl(
        { value: templateColumnRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      templateName: new FormControl(templateColumnRawValue.templateName, {
        validators: [Validators.required],
      }),
    });
  }

  getTemplateColumn(form: TemplateColumnFormGroup): ITemplateColumn | NewTemplateColumn {
    return form.getRawValue() as ITemplateColumn | NewTemplateColumn;
  }

  resetForm(form: TemplateColumnFormGroup, templateColumn: TemplateColumnFormGroupInput): void {
    const templateColumnRawValue = { ...this.getFormDefaults(), ...templateColumn };
    form.reset(
      {
        ...templateColumnRawValue,
        id: { value: templateColumnRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TemplateColumnFormDefaults {
    return {
      id: null,
    };
  }
}
