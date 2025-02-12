export interface ITemplateColumn {
  id: string;
  templateName?: string | null;
}

export type NewTemplateColumn = Omit<ITemplateColumn, 'id'> & { id: null };
