CREATE TABLE projects (
	projectId int NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
    projectDescription varchar(500) NOT NULL,
    projectThumbnail varchar (200),
    author varchar(20) NOT NULL,
    PRIMARY KEY (projectId)
);
CREATE TABLE project_skills (
	id int PRIMARY KEY NOT NULL auto_increment,
	projectId int ,
    skills varchar(30),
    FOREIGN KEY (projectId) REFERENCES projects (projectId)
);

select * from projects;

INSERT INTO projects (title, projectDescription,projectThumbnail, author)	
VALUES ('UserVice', 'A free lancing website', 'http://res.cloudinary.com/dkzqxb', 'Usman');

SELECT * FROM project_skills;
