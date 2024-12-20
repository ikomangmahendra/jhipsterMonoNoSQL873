import { IFormVariable, NewFormVariable } from './form-variable.model';

export const sampleWithRequiredData: IFormVariable = {
  id: 'e470e756-d11e-4152-99cb-d6984382e1e5',
  sectionCode: 'publicize',
  sectionName: 'so',
  formVariableType: 'OUTCOME_ASSESSMENT',
  orderIndex: 9647,
};

export const sampleWithPartialData: IFormVariable = {
  id: '84b232f5-18cf-49cd-a6f5-08c8e1a0e18b',
  sectionCode: 'seal',
  sectionName: 'sociable',
  formVariableType: 'OUTCOME_ASSESSMENT',
  orderIndex: 12314,
};

export const sampleWithFullData: IFormVariable = {
  id: '7312ed19-d5d8-431b-a01c-b170f211150b',
  sectionCode: 'inside vet',
  sectionName: 'fervently scramble',
  formVariableType: 'OUTCOME_ASSESSMENT',
  orderIndex: 16975,
};

export const sampleWithNewData: NewFormVariable = {
  sectionCode: 'yum liquid',
  sectionName: 'likewise forenenst outbid',
  formVariableType: 'ACUTE',
  orderIndex: 14445,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
