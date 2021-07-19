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
      "Update an employee's role",
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

init().catch((err) => {
  console.log(err);
});
