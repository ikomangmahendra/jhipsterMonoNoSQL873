import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITemplateProperties, NewTemplateProperties } from '../template-properties.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITemplateProperties for edit and NewTemplatePropertiesFormGroupInput for create.
 */
type TemplatePropertiesFormGroupInput = ITemplateProperties | PartialWithRequiredKeyOf<NewTemplateProperties>;

type TemplatePropertiesFormDefaults = Pick<NewTemplateProperties, 'id'>;

type TemplatePropertiesFormGroupContent = {
  id: FormControl<ITemplateProperties['id'] | NewTemplateProperties['id']>;
  label: FormControl<ITemplateProperties['label']>;
  templateColumn: FormControl<ITemplateProperties['templateColumn']>;
};

export type TemplatePropertiesFormGroup = FormGroup<TemplatePropertiesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TemplatePropertiesFormService {
  createTemplatePropertiesFormGroup(templateProperties: TemplatePropertiesFormGroupInput = { id: null }): TemplatePropertiesFormGroup {
    const templatePropertiesRawValue = {
      ...this.getFormDefaults(),
      ...templateProperties,
    };
    return new FormGroup<TemplatePropertiesFormGroupContent>({
      id: new FormControl(
        { value: templatePropertiesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      label: new FormControl(templatePropertiesRawValue.label, {
        validators: [Validators.required],
      }),
      templateColumn: new FormControl(templatePropertiesRawValue.templateColumn),
    });
  }

  getTemplateProperties(form: TemplatePropertiesFormGroup): ITemplateProperties | NewTemplateProperties {
    return form.getRawValue() as ITemplateProperties | NewTemplateProperties;
  }

  resetForm(form: TemplatePropertiesFormGroup, templateProperties: TemplatePropertiesFormGroupInput): void {
    const templatePropertiesRawValue = { ...this.getFormDefaults(), ...templateProperties };
    form.reset(
      {
        ...templatePropertiesRawValue,
        id: { value: templatePropertiesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TemplatePropertiesFormDefaults {
    return {
      id: null,
    };
  }
}
