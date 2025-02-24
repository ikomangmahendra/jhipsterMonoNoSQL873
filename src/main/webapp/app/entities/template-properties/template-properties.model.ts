import { ITemplateColumn } from 'app/entities/template-column/template-column.model';

export interface ITemplateProperties {
  id: string;
  label?: string | null;
  templateColumn?: ITemplateColumn | null;
}

export type NewTemplateProperties = Omit<ITemplateProperties, 'id'> & { id: null };
