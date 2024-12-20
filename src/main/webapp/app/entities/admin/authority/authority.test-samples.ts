import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '9da772ad-03f4-4ad3-8706-e39b96b6588f',
};

export const sampleWithPartialData: IAuthority = {
  name: '0f6d5f9b-6801-4d35-8b37-ea14c8dce932',
};

export const sampleWithFullData: IAuthority = {
  name: 'c13dc430-7407-455b-9cf6-fd56cb9af5ba',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
