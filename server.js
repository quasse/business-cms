const db = require("./db/connection");
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees"],
  },
];

function init() {
  return inquirer.prompt(questions).then(({ question }) => {
    if (question === "View all departments") {
      db.query("SELECT * FROM department", (err, rows) => {
        if (err) {
          console.log({ error: err.message });
          return;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
        console.log("\n");
      });
    } else if (question === "View all roles") {
      db.query(
        "SELECT role.title AS 'title', role.id AS 'ID', department.name AS 'Department' FROM role JOIN department ON department.id = role.department_id",
        (err, rows) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log("\n");
          console.table(rows);
          console.log("\n");
          console.log("\n");
        }
      );
    } else if (question === "View all employees") {
      db.query(
        "SELECT employee.id AS 'ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title',  role.salary AS 'Salary', employee.manager_id AS 'Manager ID' FROM employee JOIN role ON role.id = employee.role_id",
        (err, rows) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log("\n");
          console.table(rows);
          console.log("\n");
          console.log("\n");
        }
      );
    }
    return init();
  });
}

init().catch((err) => {
  console.log(err);
});
