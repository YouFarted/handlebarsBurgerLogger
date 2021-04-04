### Schema

DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured boolean DEFAULT(0) NOT NULL,
	PRIMARY KEY (id)
);