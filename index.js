// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// Create inquier promts with above questions
// write switch statenment base on user selected promts
const inquirer = require("inquirer");

const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "sarapovaK1@",
    database: "employees_db",
  },

  console.log("Start the employee ")
);


function chooseDepartment() {
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
      response
    }) {
      switch (response) {
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
  db.query("SELECT * FROM department", function (err, answers) {
    if (err) throw err;
    console.table(answers);
    chooseDepartment();
  });

}

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, answers) {
    if (err) throw err;
    console.table(answers);
    chooseDepartment();
  });
}

function viewEmployee() {
  db.query("SELECT * FROM employee", function (err, answers) {
    if (err) throw err;
    console.table(answers);
    chooseDepartment();
  });
}
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
        name: "department_name",
      },
    ])
    .then(function (answers) {
      db.query("INSERT INTO department SET ?", {
        department_name: answers.department_name,
      });
      console.table(answers);
      chooseDepartment();
    });
};


function addRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the title of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "department_name",
      choices: ["Sales", "Finance", "Engineering", "Legal"],
    },
    {
      type:"input",
      message: "What is the department id?",
      name: "department_id"
    }
  ])
  .then(function (answers) {
    db.query("INSERT INTO roles SET ?", {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department_id,
    });
    console.table(answers);
    chooseDepartment();
  });
}

const addEmployee = () => {
  db.query("SELECT * FROM employee WHERE roles_id =2", function (err, answers) {
    if (err) throw err;
    const managers = [...answers].map((object) => {
      const obj = {
        name: object.first_name,
        value: object.id,
      }
      return obj;
    })
  inquirer
  .prompt ([
    {
      type: "input",
      message: "What is the employee first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: managers,
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role",
      choices: [
        {name: "Sales lead", value: 1},
        {name: "Salespersonr", value: 2},
        {name: "Lead Engineer", value: 3},
        {name:"Software Engineer",value: 4},
        {name:"Accountant Manager", value: 5},
        {name:"Accountant",value: 6},
        {name:"Legal Team Lead",value: 7},
        {name:"Lawyer",value: 8},
        
  ],},
  ])
  .then(function (answers) {
    db.query("INSERT INTO employee SET ?", {
      roles_id: answers.role,
      first_name: answers.firstName,
      last_name: answers.lastName,
      manager_id: answers.manager,
    });
    console.table(answers);
    chooseDepartment();
  });
})
}
  

  function updateRole () {
    db.query("UPDATE employee SET roles WHERE title ?", function (err, answers) {
      console.log(answers);
      const employees = [...answers].map((object) => {
        const obj = {
          name: object.title,
          value: object.id
        }
        return obj;
      })
      inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          name: "employees",
          choices: employees,
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department does the role belong to?",
          name: "department",
          choices: ["Sales", "Finance", "Engineering", "Legal"],
        },
      ])
      .then(function (answers) {
        db.query("UPDATE employee SET roles_id=? WHERE employee(id)=?", {
          title: answers.title,
          role: answers.roles_id,
          salary: answers.salary
        });
        console.table(answers);
        inquirer.prompt(chooseDepartment);
      });
    })
  }
  chooseDepartment();