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