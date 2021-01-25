Alter Table donut_top10
Add id_num Serial

Alter Table donut_top10
Add CONSTRAINT PK_dependency_num PRIMARY KEY (id_num)

SELect * FROM donut_top10
