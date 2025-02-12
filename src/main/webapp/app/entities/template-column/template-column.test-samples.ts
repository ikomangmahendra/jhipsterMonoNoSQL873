import { ITemplateColumn, NewTemplateColumn } from './template-column.model';

export const sampleWithRequiredData: ITemplateColumn = {
  id: '20db52a3-7ca8-43d7-ad4a-f6ce80e82344',
  templateName: 'testify',
};

export const sampleWithPartialData: ITemplateColumn = {
  id: '02f32293-4533-49ae-98bd-78c2582f7a61',
  templateName: 'bah which',
};

export const sampleWithFullData: ITemplateColumn = {
  id: 'e2b8db6b-e439-404b-a0ed-9fd3beb9dbe9',
  templateName: 'sparse too vibrant',
};

export const sampleWithNewData: NewTemplateColumn = {
  templateName: 'whereas',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
