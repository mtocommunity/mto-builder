CREATE DATABASE IF NOT EXISTS mto_builder;

USE mto_builder;

CREATE TABLE template (
  id CHAR(20) PRIMARY KEY,
  name CHAR(20) NOT NULL,
  description TEXT NOT NULL,
  discord_id CHAR(20) NOT NULL,
  setup_channel_name CHAR(45) NOT NULL,
  staff_role_name CHAR(45) NOT NULL,
  member_role_name CHAR(45) NOT NULL
);

CREATE TABLE build_process (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type CHAR(20) NOT NULL,
  template_id CHAR(20) NOT NULL,
  guild_id CHAR(20) NOT NULL,
  creator_id CHAR(20) NOT NULL,
  start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  aborted BOOLEAN NOT NULL DEFAULT FALSE,
  completed_time TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES template(id)
);

-- Insert template

INSERT INTO template (id, name, description, discord_id, setup_channel_name, staff_role_name, member_role_name)
VALUES ('project-dev', 'Proyecto DevTeam', 'Esta plantilla tiene todos los materiales canales y permisos base, para poder realizar proyectos de manera colaborativa', '87Hf5azXjeSv', 'bienvenido', 'Lider de proyecto', 'miembro');