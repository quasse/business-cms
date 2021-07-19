const db = require("./db/connection");
const inquirer = require("inquirer");

var test = "";

const questions = [
  {
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

function init() {
  return inquirer.prompt(questions).then(({ question }) => {
    if (question === "View all departments") {
      getDepartments();
    } else if (question === "View all roles") {
      getRoles();
    } else if (question === "View all employees") {
      getEmployees();
    } else if (question === "Add a department") {
      addDepartment();
    } else if (question === "Add a role") {
      roleRequest();
    } else if (question === "Add an employee") {
      employeeRequest(question);
    } else if (question === "Update an employee role") {
      employeeRequest(question);
    }
  });
}

//Helper function for getting departments
const getDepartments = function () {
  let query = "SELECT * FROM department";
  db.query(query, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.table(rows);
    console.log("\n");
    console.log("\n");
    return init();
  });
};

//helper function for getting roles
const getRoles = function () {
  let query =
    "SELECT role.title AS 'title', role.id AS 'ID', department.name AS 'Department', role.salary AS 'Salary'" +
    "FROM role JOIN department ON department.id = role.department_id";
  db.query(query, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.table(rows);
    console.log("\n");
    console.log("\n");
    return init();
  });
};

//helper function for getting employees
const getEmployees = function () {
  let query =
    "SELECT employee.id AS 'ID', employee.first_name AS 'First Name'," +
    "employee.last_name AS 'Last Name', role.title AS 'Title',  role.salary AS 'Salary'," +
    "employee.manager_id AS 'Manager ID' FROM employee JOIN role ON role.id = employee.role_id";
  db.query(query, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.table(rows);
    console.log("\n");
    console.log("\n");
    return init();
  });
};

//Helper function for adding department
const addDepartment = function () {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message:
          "Please enter the name of the department you would like to add",
      },
    ])
    .then((response) => {
      console.log(response.department);
      //Add response to Department table
      query = "INSERT INTO department (name) VALUES(?)";
      params = response.department;
      db.query(query, params, (err, result) => {
        if (err) {
          console.log({ error: err.message });
          return;
        }
        console.log("\n");
        console.log(response.department + " added to departments");
        console.log("\n");
        return init();
      });
    });
};

//Gets all the departments from the database to pass to the user as a question
const roleRequest = function () {
  let query = "SELECT department.name FROM department";

  db.query(query, (err, departments) => {
    let deptArr = [];
    if (err) {
      console.log({ error: err.message });
      return;
    }
    for (let i = 0; i < departments.length; i++) {
      deptArr.push(departments[i].name);
    }
    promptRole(deptArr);
  });
};

//Asks user details of the role they would like to add using departments list from previous function
const promptRole = function (deptArr) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the name of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for the role:",
      },
      {
        type: "list",
        name: "department",
        message: "Please enter the department for the role",
        choices: deptArr,
      },
    ])
    .then((response) => {
      addRole(response, deptArr);
    });
};

//Adds new role to role table
const addRole = function (res, deptArr) {
  //The department_id of this object is 1 more than its position in deptArr
  const index = deptArr.indexOf(res.department) + 1;

  //query for database call
  query = `INSERT INTO role (title, salary, department_id) VALUES('${
    res.title
  }', 
  ${parseInt(res.salary)}, ${parseInt(index)})`;
  db.query(query, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.log(res.title + " added to roles");
    console.log("\n");
    return init();
  });
};

//gets all employee's from the database and roles from the database
const employeeRequest = function (question) {
  let query = "SELECT * from employee";

  //query for getting all employees
  db.query(query, (err, employees) => {
    let employeeArr = [];
    let roleArr = [];
    if (err) {
      console.log({ error: err.message });
      return;
    }
    for (let i = 0; i < employees.length; i++) {
      let employee = employees[i].first_name + " " + employees[i].last_name;
      employeeArr.push(employee);
    }

    //query for getting the roles
    query = "SELECT * from role";
    db.query(query, (err, roles) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      for (let j = 0; j < roles.length; j++) {
        roleArr.push(roles[j].title);
      }

      //Select helper function based on initial question
      if (question === "Add an employee") {
        promptEmployee(employeeArr, roleArr);
      } else {
        promptEmployeeUpdate(employeeArr, roleArr);
      }
    });
  });
};

//Asks user questions about new employee to be added
const promptEmployee = function (employeeArr, roleArr) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fName",
        message: "Please enter the first name of the employee:",
      },
      {
        type: "input",
        name: "lName",
        message: "Please enter the last name of the employee:",
      },
      {
        type: "list",
        name: "manager",
        message: "Please select the manager of the employee",
        choices: employeeArr,
      },
      {
        type: "list",
        name: "role",
        message: "Please select the employee's role",
        choices: roleArr,
      },
    ])
    .then((response) => {
      addEmployee(response, employeeArr, roleArr);
    });
};

//Queries database to add employee
const addEmployee = function (res, employeeArr, roleArr) {
  //Indexes
  let managerIndex = employeeArr.indexOf(res.manager) + 1;
  let roleIndex = roleArr.indexOf(res.role) + 1;

  query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES('${res.fName}', '${res.lName}', ${parseInt(roleIndex)}, ${parseInt(
    managerIndex
  )})`;
  db.query(query, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.log(res.fName + " " + res.lName + " added.");
    console.log("\n");
    return init();
  });
};

//Asks user which employee they would like to update
const promptEmployeeUpdate = function (employeeArr, roleArr) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employeeArr,
      },
    ])
    .then((response) => {
      promptRoleUpdate(response, employeeArr, roleArr);
    });
};

//Asks user which role they would like to change to
const promptRoleUpdate = function (employee, employeeArr, roleArr) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role would you like this employee to have?",
        choices: roleArr,
      },
    ])
    .then((response) => {
      updateEmployee(response, employee, employeeArr, roleArr);
    });
};

//Update's employee using previous two helper functions
const updateEmployee = function (role, employee, employeeArr, roleArr) {
  let employeeIndex = employeeArr.indexOf(employee.employee) + 1;
  let roleIndex = roleArr.indexOf(role.role) + 1;

  const query = `Update employee set role_id = ${parseInt(roleIndex)} 
  where id = ${parseInt(employeeIndex)}`;

  db.query(query, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.log("\n");
    console.log(employee.employee + "'s role has been updated to " + role.role);
    console.log("\n");
    return init();
  });
};

init().catch((err) => {
  console.log(err);
});
