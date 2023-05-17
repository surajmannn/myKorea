CREATE TABLE users (
      ID INT NOT NULL AUTO_INCREMENT,  
      role VARCHAR(16) NOT NULL DEFAULT 'user',
      firstName VARCHAR(32),  
      lastName VARCHAR(32),
      username VARCHAR(16) UNIQUE NOT NULL,
      dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR(256) NOT NULL,  
      email VARCHAR(64) UNIQUE NOT NULL,
      avatarURL VARCHAR(128),
      PRIMARY KEY (ID),
      FOREIGN KEY (role) REFERENCES roles (name)
);

"123 Hash: $2b$10$ADylIBndqR6pRfZKv1P7wub33BxadDjwFRgr3GnWyfR3tPnQHqxE."
"Insert users"
INSERT INTO users (role, firstName, lastName, username, password, email) VALUES
      ("admin", "Suraj", "Mann", "surajmannn", 123, "surajmann@hotmail.com"),
      ("user", "Test1", "Tester", "test1", 123, "test1@hotmail.com"),
      ("user", "Test2", "Tester", "test2", 123, "test2@hotmail.com");

"Insert User JSON Request"
{
    "firstname" : "Test4",
    "lastname" : "Tester",
    "username" : "test4",
    "password" : "123",
    "email" : "test4@hotmail.com"
}