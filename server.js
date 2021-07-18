const db = require("./db/connection");
const inquirer = require("inquirer");

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
      "Update an employee role",
    ],
  },
];

const getDepartments = function () {
  //console.log("This is db" + db);
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    return rows;
  });
  console.log(rows);
};

function init() {
  let query = "";
  let params = "";
  return inquirer.prompt(questions).then(({ question }) => {
    if (question === "View all departments") {
      query = "SELECT * FROM department";
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
      //var departments = getDepartments();
      //console.log(departments);
      return init();
    } else if (question === "View all roles") {
      query =
        "SELECT role.title AS 'title', role.id AS 'ID', department.name AS 'Department' FROM" +
        " role JOIN department ON department.id = role.department_id";
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
    } else if (question === "View all employees") {
      query =
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
    } else if (question === "Add a department") {
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
    } else if (question === "Add a role") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "roleTitle",
            message: "Please enter the name of the role:",
          },
          {
            type: "input",
            name: "roleSalary",
            message: "Please enter the salary for the role:",
          },
          {
            type: "input",
            name: "roleDepartment",
            message: "Please enter the department for the role",
          },
        ])
        .then((response) => {
          console.log(response);
        });
    }
  });
}

init().catch((err) => {
  console.log(err);
});
