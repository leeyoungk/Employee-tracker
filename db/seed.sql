INSERT INTO department (id,name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (id,title,salary,department_id)
VALUES  (1,"sales lead", 100000, "Sales",4),
        (2,"Salesperson", 80000, "Sales",4),
        (3,"Lead Engineer", 150000, "Engineering",1),
        (4,"Software Engineer", 120000, "Engineering",1)
        (5,"Account Manager", 160000, "Finance",2)
        (6,"Accountant", 125000, "Finance",2)
        (7,"Legal Team Lead", 250000,"Legal",3)
        (8,"Lawyer", 190000, "Legal",3)


INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES  (3,"John", "Doe",3, NULL ),
        (1,"Mike", "Chan",1,3),
        (2"Ashley", "Rodriguez",2,3),
        (4"Kevin", "Tupik",4,NULL),
        (5"Kunal", "Singh",5,7),
        (6"Malia", "Brown",6.7),
        (7"Sarah", "Lourd",7,NULL),
        (8"Tom", "Allen",8,4),
