INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales")

INSERT INTO role (title,salary,department_id)
VALUES  ("sales lead", 100000, "Sales",4),
        ("Salesperson", 80000, "Sales",4),
        ("Lead Engineer", 150000, "Engineering",1),
        ("Software Engineer", 120000, "Engineering",1)
        ("Account Manager", 160000, "Finance",2)
        ("Accountant", 125000, "Finance",2)
        ("Legal Team Lead", 250000,"Legal",3)
        ("Lawyer", 190000, "Legal",3)


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES  ("John", "Doe",1,),
        ("Mike", "Chan",2),
        ("Ashley", "Rodriguez",3),
        ("Kevin", "Tupik",4),
        ("Kunal", "Singh",5),
        ("Malia", "Brown",6),
        ("Sarah", "Lourd",7),
        ("Tom", "Allen",8),
