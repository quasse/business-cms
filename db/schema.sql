DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);