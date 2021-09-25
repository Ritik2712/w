CREATE DATABASE Hello_app;

CREATE TABLE board( boardId uuid DEFAULT uuid_generate_v4 () PRIMARY KEY, BoardDesc varchar(255) );

CREATE TABLE List( ListId uuid DEFAULT uuid_generate_v4 () PRIMARY KEY, ListDesc varchar(255), boardId varchar );

CREATE TABLE Card( CardId uuid DEFAULT uuid_generate_v4 () PRIMARY KEY, CardDesc varchar(255), ListId uuid DEFAULT uuid_generate_v4 () );

CREATE TABLE Register( userid serial PRIMARY KEY, fname VARCHAR(255) , lname VARCHAR(255), email VARCHAR(255) , pass VARCHAR(255), );

CREATE TABLE Login( loginemail VARCHAR(255), loginpass VARCHAR(255) )
--
-- SELECT  id
-- --
-- FROM users
-- --
-- WHERE email = 'jbisceglia2000@gmail.com'
-- -- 
-- AND password = crypt（'pass' password）; 