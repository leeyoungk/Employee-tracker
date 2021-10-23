// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// Create inquier promts with above questions
// write switch statenment base on user selected promts
const inquirer = require("inquirer");

const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "sarapovaK1@",
    database: "employee_db",
  },

  console.log("Start the employee or.")
);

function choiceDepartment() {
  inquirer.prompt([{
      type: "list",
      name: "department",
      message: "What would you like to do",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Stop"
      ],
    }, 
  ]).then(function ({
      department
    }) {
      switch (department) {
        case "View Departments":
          viewDept();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployee();
          break;
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Stop":
          connection.stop();
          break;
      }
    });
}

function viewDept() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log(`DEPARTMENT:`);
    console.table(res);
    res.forEach((department) => {
      console.log(`ID: ${department.department_id} | Name: ${department.names}`);
    });
    choiceDepartment()
  });

}

function viewRoles() {
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    console.log(`ROLES:`);
    console.table(res);
    res.forEach((roles) => {
      console.log(
        `ID: ${roles.roles_id} | Title: ${roles.title} | Salary: ${roles.salary} | Department ID: ${roles.department_id}`
      );
    });
    choiceDepartment()
  });
}

function viewEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log(`EMPLOYEE:`);
    console.table(res);
    res.forEach((employee) => {
      console.log(
        `ID: ${employee.employee_id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.roles_id} | Manager ID: ${employee.manager_id}`
      );
    });
    choiceDepartment()
  });
}

function addDept() {
  inquirer.prompt({
      name: "department",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department_id, function (err, res) {
        console.log(
          `You have added this department: ${answer.department.toUpperCase()}.`
        );
        console.table(res);
      });
      choiceDepartment()
    });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(res);
    inquirer.prompt([{
          name: "title",
          type: "input",
          message: "What is the title of the new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the new role?",
        },
        {
          name: "department_Name",
          type: "list",
          message: "Which department does this role fall under?",
          choices: function () {
            var choicesArray = [];
            res.forEach((res) => {
              choicesArray.push(res.names);
            });
            return choicesArray;
          },
        },
      ]).then(function (answer) {
        const department = answer.department_Name;
        connection.query('SELECT * department', function (err, res) {

          if (err) throw err;
          var filteredDept = res.filter(function (res) {
            return res.names == department;
          });
          const id = filteredDept[0].department_id;
          var query =
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
          var values = [answer.title, parseInt(answer.salary), id];
          console.log(values);
          console.table(res);
          connection.query(query, values, function (err, res, fields) {
            console.log(`You have added this role: ${values[0].toUpperCase()}.`);
          });
          viewRoles()
        });
      })
  });
}

async function addEmployee() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;

    inquirer.prompt([{
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "roleName",
          type: "list",
          message: "What role does the employee have?",
          choices: function () {
            rolesArray = [];
            res.forEach((res) => {
              rolesArray.push(res.title);
            });
            return rolesArray;
          },
        },
      ]).then(function (answer) {
        console.log(answer);
        console.table(res);
        const role = answer.rolesName;
        connection.query("SELECT * FROM roles", function (err, res) {
          if (err) throw err;
          let filteredRoles = res.filter(function (res) {
            return res.title == roles;
          });
          const roleId = filteredRoles[0].roles_id;
          connection.query("SELECT * FROM employee", function (err, res) {
            inquirer
              .prompt([{
                name: "manager",
                type: "list",
                message: "Who is your manager?",
                choices: function () {
                  managersArray = [];
                  res.forEach((res) => {
                    managersArray.push(res.last_name);
                  });
                  return managersArray;
                },
              }, 
            ]).then(function (managerAnswer) {
                const manager = managerAnswer.manager;
                connection.query("SELECT * FROM employee", function (err, res) {
                  if (err) throw err;
                  let filteredManager = res.filter(function (res) {
                    return res.last_name == manager;
                  });
                  const managerId = filteredManager[0].manager_id;
                  console.log(managerAnswer);
                  console.table(res);
                  var query =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                  const values = [
                    answer.firstName,
                    answer.lastName,
                    roles_id,
                    manager_id,
                  ];
                  console.log(values);
                  console.table(res);
                  connection.query(query, values, function (err, res, fields) {
                    console.log(
                      `You have added this employee: ${values[0].toUpperCase()}.`
                    );
                  });
                  viewEmployee()
                });
              });
          });
        });
      });
  });
}
  

  function  updateRole () {
    connection.query("SELECT * FROM employee", function (err, result) {
      if (err) throw err;
      inquirer
        .prompt([{
          name: "employeeName",
          type: "list",
          message: "Add employee role",
          choices: function () {
            employeeArray = [];
            result.forEach((result) => {
              employeeArray.push(result.last_name);
            });
            return employeeArray;
          },
        }, 
      ]).then(function (answer) {
          console.log(answer);
          
          const name = answer.employeeName;

          connection.query("SELECT * FROM roles", function (err, res) {
            inquirer
              .prompt([{
                name: "roles",
                type: "list",
                message: "What is their new roles?",
                choices: function () {
                  rolesArray = [];
                  res.forEach((res) => {
                    rolesArray.push(res.title);
                  });
                  return rolesArray;
                },
              }, 
            ]).then(function (rolesAnswer) {
                const roles = rolesAnswer.role;
                console.log(rolesAnswer.role);
                connection.query(
                  "SELECT * FROM role WHERE title = ?",
                  [roles],
                  function (err, res) {
                    if (err) throw err;
                    var rolesId = res[0].roles_id;
                    var query =
                      "UPDATE employee SET roles_id ? WHERE last_name ?";
                    var values = [roleId, names];
                    console.log(values);
                    connection.query(
                      query,
                      values,
                      function (err, res, fields) {
                        console.log(
                          `You have updated ${names}'s role to ${roles}.`
                        );
                      }
                    );
                    
                  }
                );
              });
          });
        });
    });
  }
  choiceDepartment()