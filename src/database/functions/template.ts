import Template from '../models/template';

export function listTemplates(): Promise<Template[]> {
  return Template.findAll();
}

export function getTemplate(id: string): Promise<Template | null> {
  try {
    return Template.findOne({ where: { id: id } });
  } catch (e) {
    return Promise.resolve(null);
  }
}
