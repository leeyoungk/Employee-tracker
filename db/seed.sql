INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO  role (id,title,salary,department_id)
VALUES  (1,"sales lead", 150000,4),
        (2,"Salesperson", 80000,4),
        (3,"Lead Engineer", 140000,1),
        (4,"Software Engineer", 120000,1),
        (5,"Account Manager", 140000,2),
        (6,"Accountant", 125000,2),
        (7,"Legal Team Lead", 130000,3),
        (8,"Lawyer", 130000,3);


INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES  (3,"John", "Doe",3, NULL ),
        (1,"Mike", "Chan",1,3),
        (2,"Ashley", "Rodriguez",2,3),
        (4,"Kevin", "Tupik",4,NULL),
        (5,"Kunal", "Singh",5,7),
        (6,"Malia", "Brown",6,7),
        (7,"Sarah", "Lourd",7,NULL),
        (8,"Tom", "Allen",8,4);
