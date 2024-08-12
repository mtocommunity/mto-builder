import Template from '../models/template';

export function listTemplates(): Promise<Template[]> {
  return Template.findAll();
}
