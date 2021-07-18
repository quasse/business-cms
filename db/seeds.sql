INSERT INTO department (name)
VALUES
    ("Administration"),
    ("Sales"),
    ("Human Resources"),
    ("Research and Development"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES
    ("CEO", 100000.00, 1),
    ("COO", 90000.00, 1),
    ("Salesman", 75000.00, 2),
    ("Recruiter", 50000.00, 3),
    ("Manager", 65000.00, 3),
    ("Research lead", 80000.00, 4),
    ("Research assistant", 70000.00, 4),
    ("Chief Engineer", 60000.00, 5),
    ("Assistant engineer", 55000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
	("John", "Smith", 1, null),
	("Jacob", "Johnson", 2, 1),
    ("Sam", "Jones", 3, 1),
    ("Martin", "Stevens", 4, 1),
    ("Jessica", "Ellis", 5, 4),
    ("Angela", "Bingam", 6, 1),
    ("Abel", "Stone", 7, 6),
    ("Michael", "Stringer", 7, 6),
    ("Emma", "Brown", 8, 1),
    ("Kennedy", "Kerry", 9, 9);   