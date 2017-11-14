DROP DATA BASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id integer auto_increment not null,
product_name varchar(45) not null,
department_name varchar(45) not null,
price decimal(10,4) not null,
stock_quantity integer(10) not null,
primary key (item_id)
);

SELECT * FROM bamazon.products;

INSERT INTO products (product_name, departament_name, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 49.95, 150),
	("GTA", "Video Games", 59.99, 10),
	("Mole Rojo", "Food and Drink", 10.99, 20),
	("Green jacket", "Apparel", 80.00, 5),
	("Denim Jacket", "Apparel", 50.00, 5),
	("Band Aids", "Necessities", 3.00, 10),
	("Rocky", "Films", 19.99, 20),
	("Aladin", "Films", 19.99, 20),
	("Black pens", "Office supplies", 4.99, 40);
