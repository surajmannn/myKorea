CREATE TABLE orders (
      ID INT NOT NULL AUTO_INCREMENT,
      productID INT NOT NULL,
      userID INT NOT NULL,
      username VARCHAR(16) NOT NULL,  
      dateOrdered DATETIME DEFAULT CURRENT_TIMESTAMP,
      quantity INT NOT NULL, 
      productPrice DECIMAL(10,2) NOT NULL,
      totalPrice DECIMAL(10,2) NOT NULL,
      PRIMARY KEY (ID)
);

" Insert template for orders "
INSERT INTO orders (productID, userID, username, quantity, productPrice, totalPrice) VALUES
      (2, 2, "test2", 2, 2.5, 5);

" JSON Request Insert"
{
    "productID" : 2,
    "userID" : 2,
    "username" : "test1",
    "quantity" : 2,
    "productPrice" : 2.50,
    "totalPrice" : 5.00
}