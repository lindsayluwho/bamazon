DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat food", "pets", 5.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog food", "pets", 7.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bungee cord", "outdoors", 3.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "personal & beauty", 1.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dish soap", "household supplies", 2.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("snow shovel", "outdoors", 20.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stapler", "office supplies", 8.00, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wool overcoat", "clothing", 80.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("welcome mat", "home decor", 20.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("table lamp", "home decor", 40.00, 130);