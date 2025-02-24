import { ITemplateProperties, NewTemplateProperties } from './template-properties.model';

export const sampleWithRequiredData: ITemplateProperties = {
  id: '4fa0d1f3-11b5-43e3-8977-d72b63f14034',
  label: 'suspiciously alive whose',
};

export const sampleWithPartialData: ITemplateProperties = {
  id: '140716dc-461e-4501-9a08-6f656cd1be7c',
  label: 'willow sin successfully',
};

export const sampleWithFullData: ITemplateProperties = {
  id: 'ea3e8aa8-6055-4553-a06d-702c4baae40b',
  label: 'homely noon fictionalize',
};

export const sampleWithNewData: NewTemplateProperties = {
  label: 'gosh guidance',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
