INSERT INTO department (id, name)
VALUES
    (1, "Administration"),
    (2, "Sales"),
    (3, "Human Resources"),
    (4, "Research and Development"),
    (5, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, "CEO", 100000.00, 1),
    (2, "COO", 90000.00, 1),
    (3, "Salesman", 75000.00, 2),
    (4, "Recruiter", 50000.00, 3),
    (5, "Manager", 65000.00, 3),
    (6, "Research lead", 80000.00, 4),
    (7, "Research assistant", 70000.00, 4),
    (8, "Chief Engineer", 60000.00, 5),
    (9, "Assistant engineer", 55000.00, 5);

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
    (10, "Kennedy", "Kerry", 9, 9);   