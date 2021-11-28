INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO  role (title,salary,department_id)
VALUES  ("sales lead", 150000,4),
        ("Salesperson", 80000,4),
        ("Lead Engineer", 140000,1),
        ("Software Engineer", 120000,1),
        ("Account Manager", 140000,2),
        ("Accountant", 125000,2),
        ("Legal Team Lead", 130000,3),
        ("Lawyer", 130000,3);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  ("John", "Doe",3, NULL ),
        ("Mike", "Chan",1,NULL),
        ("Ashley", "Rodriguez",2,2),
        ("Kevin", "Tupik",4,NULL),
        ("Kunal", "Singh",5,NULL),
        ("Malia", "Brown",6,3),
        ("Sarah", "Lourd",7,NULL),
        ("Tom", "Allen",8,4);
