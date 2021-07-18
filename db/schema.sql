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

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
	(1, "John", "Smith", 1, null),
	(2, "Jacob", "Johnson", 2, 1),
    (3, "Sam", "Jones", 3, 1),
    (4, "Martin", "Stevens", 4, 1),
    (5, "Jessica", "Ellis", 5, 4),
    (6, "Angela", "Bingam", 6, 1),
    (7, "Abel", "Stone", 7, 6),
    (8, "Michael", "Stringer", 7, 6),
    (9, "Emma", "Brown", 8, 1),
    (10, "Kennedy", "Kerry", 9, 8);