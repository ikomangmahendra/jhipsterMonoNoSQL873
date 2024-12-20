import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: '40e16a73-4c89-4612-afc0-b7b825b5c6ff',
  login: 'i@9p\\:qfNOX\\yhGq\\"2\\Wlu8',
};

export const sampleWithPartialData: IUser = {
  id: '7034f70c-3338-4b53-a4c5-53f72c16c1af',
  login: '-@g\\/gRyLXc',
};

export const sampleWithFullData: IUser = {
  id: '2bdb7fbf-3abc-41fc-b860-8e2c2af137d4',
  login: 'o9-',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
