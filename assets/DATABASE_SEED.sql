CREATE DATABASE IF NOT EXISTS mto_builder;

USE mto_builder;

CREATE TABLE template (
  id CHAR(20) PRIMARY KEY,
  name CHAR(20) NOT NULL,
  description TEXT NOT NULL,
  discord_id CHAR(20) NOT NULL
);

CREATE TABLE build_process (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type CHAR(20) NOT NULL,
  template_id CHAR(20) NOT NULL,
  creator_id CHAR(20) NOT NULL,
  start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_time TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES template(id)
);

-- Insert template

INSERT INTO template (id, name, description, discord_id) VALUES ('project-dev', 'Proyecto DevTeam', 'Esta plantilla tiene todos los materiales canales y permisos base, para poder realizar proyectos de manera colaborativa', '87Hf5azXjeSv');