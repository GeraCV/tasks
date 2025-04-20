-- DROP SCHEMA IF EXISTS tasks;
CREATE SCHEMA tasks;

USE tasks;

-- DROP TABLE IF EXISTS task;
CREATE TABLE task (
    id int not null primary key auto_increment,
    task_name varchar(255),
    created_at timestamp null default current_timestamp,
    updated_at timestamp null on update current_timestamp
) engine = innoDB;

INSERT INTO
    task (task_name)
VALUES
    ('Tarea 1'),
    ('Tarea 2'),
    ('Tarea 3'),
    ('Tarea 4'),
    ('Tarea 5');