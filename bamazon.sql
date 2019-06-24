DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("cocktail shaker", "Kitchen & Dining", 15, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("backpack", "Travel Gear", 25, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("shades", "Clothing & Accessories", 5, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("baseball cap", "Clothing & Accessories", 9, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("phone charger", "Technology", 12, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Speculoos Cookie Butter", "Food & Drink", 6, 23);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Skippy Peanut Butter", "Food & Drink", 3, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "Health and Household", 8, 14);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Brownie Pan", "Food & Drink", 16, 2);

SELECT * FROM products;

