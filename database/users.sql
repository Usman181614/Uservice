CREATE TABLE Users(
	userName varchar (10) NOT NULL,
    email varchar (25) NOT NULL,
    passcode varchar (25) NOT NULL    
);

SELECT * FROM Users;

ALTER TABLE users
MODIFY COLUMN userName varchar(25);

CREATE TABLE user_skills (
	userName varchar (25) NOT NULL,
    skills varchar (25) NOT NULL,
    FOREIGN KEY (userName) REFERENCES Users (userName)
);

SELECT * FROM user_skills