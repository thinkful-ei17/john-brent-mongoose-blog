DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id serial PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL
);

CREATE TABLE stories (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  author_id int REFERENCES authors 
  
);



ALTER SEQUENCE stories_id_seq RESTART with 1000;
ALTER SEQUENCE authors_id_seq RESTART with 100;


INSERT INTO authors (username, email) VALUES
  ('jeffSociety',
   'jeffSociety@gmail.com'
  ),
  ('sk8rboi',
   'cyal8rboi@gmail.com'
  );

INSERT INTO stories (title, content, author_id) VALUES
    ('What the government doesn''t want you to know about cats', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    100),

    ('The most boring article about cats you''ll ever read', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    101);