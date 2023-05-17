CREATE TABLE reviews (
      ID INT NOT NULL AUTO_INCREMENT,
      productID INT NOT NULL,
      review TEXT,
      rating INT NOT NULL,
      userID INT NOT NULL,
      username VARCHAR(16) NOT NULL,  
      dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY (productID) REFERENCES products (ID) ON DELETE CASCADE,
      PRIMARY KEY (ID)
);

" Insert template for reviews "
INSERT INTO orders (productID, review, rating, userID, username) VALUES
      (2, "Tastes so good!", 5, 2, "test1");

" JSON Request Insert"
{
    "productID" : 2,
    "review" : "Tastes so good!",
    "rating" : 5,
    "userID" : 2,
    "username" : "test1",
}