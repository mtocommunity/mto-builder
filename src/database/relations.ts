import BuildProcess from './models/build_process';
import Template from './models/template';

export default function makeRelations() {
  BuildProcess.belongsTo(Template, {
    foreignKey: 'template_id',
    targetKey: 'id'
  });

  Template.hasMany(BuildProcess, {
    foreignKey: 'template_id',
    sourceKey: 'id'
  });

  console.log('Tablas relacionadas exitósamente');
}
