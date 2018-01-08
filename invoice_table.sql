CREATE DATABASE weaved_in;

CREATE USER 'invoice'@'localhost' IDENTIFIED BY 'weavedIn';

GRANT ALL PRIVILEGES ON weaved_in . * TO 'invoice'@'localhost';

USE weaved_in;

CREATE TABLE user ( 
 inv_cd    int  NOT NULL AUTO_INCREMENT,
 user   VARCHAR(255),
 email     VARCHAR(150),
 address     VARCHAR(255),
 pin_code     VARCHAR(30),
 phone     VARCHAR(30),
 tax_percent     float,
 discount_percent   float,
 created_date     DATETIME DEFAULT CURRENT_TIMESTAMP,
 primary key (inv_cd)  
);

CREATE TABLE inventory ( 
 inventory_cd    int  NOT NULL AUTO_INCREMENT,
 inv_cd   int,
 name     VARCHAR(150),
 quantity     int,
 price     float,
 primary key (inventory_cd),
 FOREIGN KEY (inv_cd) REFERENCES user(inv_cd)
);
