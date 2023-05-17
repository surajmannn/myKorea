CREATE TABLE products (
      ID INT NOT NULL AUTO_INCREMENT,  
      title VARCHAR(32) NOT NULL,  
      description TEXT NOT NULL,
      dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
      imageURL VARCHAR(128),  
      productPrice DECIMAL(10,2),
      categoryID INT NOT NULL,
      PRIMARY KEY (ID)
);

"Insert Products"
INSERT INTO products (title, description, productPrice, categoryID) VALUES
      ("Samyang Ramen", "Super Spicy Black Chicken Ramen", 2.50, 1),
      ("Samyang 2X Spicy Ramen", "2X Super Spicy Red Chicken Ramen", 2.50, 1);

" JSON Request Insert"
{
    "title" : "Samyang Pink Ramen modified",
    "description" : "Carbonara Hot Chicken Flavour Ramen",
    "productPrice" : 2.50,
    "categoryID" : 1
}