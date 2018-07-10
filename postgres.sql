-- 1. Create necessary table with proper primary, foreign keys 
CREATE TABLE books 
             ( 
                          book_id SERIAL PRIMARY KEY , 
                          NAME      VARCHAR2(100) NOT NULL, 
                          isbn      VARCHAR(25), 
                          author_id INTEGER 
             );CREATE TABLE authors 
             ( 
                          author_id SERIAL PRIMARY KEY , 
                          NAME VARCHAR(50) NOT NULL 
             );ALTER TABLE books ADD FOREIGN KEY (author_id) REFERENCES authors(author_id);CREATE TABLE categories
             ( 
                          category_id SERIAL PRIMARY KEY, 
                          NAME VARCHAR(50) NOT NULL 
             );CREATE TABLE books_categories 
             ( 
                          id SERIAL PRIMARY KEY, 
                          book_id     INTEGER REFERENCES books(book_id), 
                          category_id INTEGER REFERENCES categories(category_id) 
             );CREATE TABLE users 
             ( 
                          user_id SERIAL PRIMARY KEY, 
                          NAME  VARCHAR(30) NOT NULL, 
                          email VARCHAR(20) NOT NULL 
             );CREATE TABLE loan 
             ( 
                          loan_id SERIAL PRIMARY KEY, 
                          user_id     INTEGER REFERENCES users(user_id), 
                          book_id     INTEGER REFERENCES books(book_id), 
                          issued_date DATE NOT NULL, 
                          due_date    DATE NOT NULL, 
                          return_date DATE 
             );INSERT INTO authors 
            ( 
                        NAME 
            ) 
            VALUES 
            ( 
                        'shankar' 
            ) 
            , 
            ( 
                        'dennis' 
            );INSERT INTO authors 
            ( 
                        NAME 
            ) 
            VALUES 
            ( 
                        'dan' 
            ); 

-- 2. Insert 10 books; Each book will have one author; Some authors should have multiple books.INSERT INTO books
            ( 
                        NAME, 
                        isbn, 
                        author_id 
            ) 
            VALUES 
            ( 
                        'javascript', 
                        'ISBN 978-2-12-345680-4', 
                        2 
            ) 
            , 
            ( 
                        'html5 ', 
                        'ISBN 978-2-12-345680-6', 
                        1 
            ) 
            , 
            ( 
                        'Physics', 
                        'ISBN 978-2-12-345680-7', 
                        2 
            );INSERT INTO books 
            ( 
                        NAME, 
                        isbn, 
                        author_id 
            ) 
            VALUES 
            ( 
                        'star wars', 
                        'ISBN 978-2-12-345680-4', 
                        1 
            ) 
            , 
            ( 
                        'dune ', 
                        'ISBN 978-2-12-345630-5', 
                        3 
            ) 
            , 
            ( 
                        'hypersion', 
                        'ISBN 978-2-12-345780-7', 
                        3 
            ) ; 

-- 3. Assign categories to each books; One book can have many categoriesINSERT INTO categories 
            ( 
                        NAME 
            ) 
            VALUES 
            ( 
                        'programming' 
            ) 
            , 
            ( 
                        'business' 
            ) 
            , 
            ( 
                        'sci-fi' 
            );INSERT INTO books_categories 
            ( 
                        book_id, 
                        category_id 
            ) 
            VALUES 
            ( 
                        1,1 
            ) 
            , 
            ( 
                        2,1 
            ) 
            , 
            ( 
                        3,2 
            ) 
            , 
            ( 
                        4,1 
            ) 
            , 
            ( 
                        4,2 
            ) 
            , 
            ( 
                        5,1 
            ) 
            , 
            ( 
                        6,1 
            ) 
            , 
            ( 
                        7,1 
            ) 
            , 
            ( 
                        7,3 
            ) 
            , 
            ( 
                        8,3 
            ) 
            , 
            ( 
                        9,3 
            ) 
            , 
            ( 
                        10,3 
            ) ; 

-- 4. Insert 5 usersINSERT INTO users 
            ( 
                        NAME , 
                        email 
            ) 
            VALUES 
            ( 
                        'shankar', 
                        'shankar@gmail.com' 
            ) 
            , 
            ( 
                        'uzal', 
                        'uzal@gmail.com' 
            ) 
            , 
            ( 
                        'aayush', 
                        'aayush@gmail.com' 
            ) 
            , 
            ( 
                        'manish', 
                        'manish@gmail.com' 
            ) 
            , 
            ( 
                        'akasky', 
                        'akasky@gmail.com' 
            ); 

-- 5. Record 10 loan activity; One book can only be loaned by one user at a timeINSERT INTO loans
            ( 
                        user_id, 
                        book_id, 
                        issued_date, 
                        due_date, 
                        return_date 
            ) 
            VALUES 
            ( 
                        2,7, 
                        '2018-03-08', 
                        '2018-04-08', 
                        '2018-04-10' 
            ) 
            , 
            ( 
                        1,1, 
                        '2018-05-08', 
                        '2018-06-08', 
                        '2018-06-10' 
            ) 
            , 
            ( 
                        1,3, 
                        '2018-07-08', 
                        '2018-08-08', 
                        NULL 
            ) 
            , 
            ( 
                        2,7, 
                        '2018-09-08', 
                        '2018-10-08', 
                        '2018-10-10' 
            ) 
            , 
            ( 
                        3,5, 
                        '2018-01-08', 
                        '2018-02-08', 
                        '2018-02-10' 
            ) 
            , 
            ( 
                        4,6, 
                        '2018-01-08', 
                        '2018-02-08', 
                        '2018-02-10' 
            ) 
            , 
            ( 
                        5,2, 
                        '2018-01-08', 
                        '2018-02-08', 
                        '2018-02-10' 
            ) 
            , 
            ( 
                        4,9, 
                        '2018-01-08', 
                        '2018-02-08', 
                        NULL 
            ) 
            , 
            ( 
                        5,10, 
                        '2018-01-08', 
                        '2018-02-08', 
                        NULL 
            ); 

-- 6. Select available booksSELECT     * 
FROM       books 
RIGHT JOIN 
           ( 
                  SELECT book_id 
                  FROM   books 
                  EXCEPT 
                  SELECT book_id 
                  FROM   loans 
                  WHERE  loans.return_date IS NULL ) AS s 
ON         books.book_id = s.book_id; 

-- 7. Select books for a specific author; Returned list should be order by their titlesSELECT   *
FROM     books , 
         authors 
WHERE    books.author_id = authors.author_id 
AND      authors.NAME = 'shankar' 
ORDER BY books.NAME; 

-- 8. Add category filter to 7;SELECT   * 
FROM     ( 
                  SELECT   * 
                  FROM     books , 
                           authors 
                  WHERE    books.author_id = authors.author_id 
                  AND      authors.NAME = 'shankar' 
                  ORDER BY books.NAME) AS s natural 
JOIN     books_categories 
ORDER BY category_id; 

-- 9. Fetch the books that were loaned between date “A” and “B”SELECT NAME , 
       isbn , 
       author_id 
FROM   loans natural 
JOIN   books 
WHERE  loans.issued_date BETWEEN '2018-01-06' AND    '2018-03-03'; 

-- 10. User wants to return a loaned book. Write an update query to make this happen.UPDATE loans
SET    return_date = CURRENT_DATE 
WHERE  user_id = 3; 

-- 11. Another user wants to return multiple loaned book. Write an update query to make this happen.UPDATE loans
SET    return_date = CURRENT_DATE 
WHERE  return_date IS NULL 
AND    user_id = 4; 

-- 12. Check what happens when you want to delete an author; What needs to be done ?DELETE 
FROM   authors 
WHERE  author_id = 1; 

-- ERROR:  update or delete on table "authors" violates foreign key constraint "books_author_id_fkey" on table "books"
-- DETAIL:  Key (author_id)=(1) is still referenced from table "books". 
-- 13. Write a query to delete users who have not leased any books for a monthUPDATE users 
SET    is_deleted = true 
WHERE  user_id IN 
       ( 
              SELECT user_id 
              FROM   loans 
              WHERE  issued_date < CURRENT_DATE - interval '30 days'); 

-- 13. Write a query to delete users who have not leased any books for a monthSELECT     NAME AS blacklist
FROM       users 
INNER JOIN 
           ( 
                  SELECT * 
                  FROM   loans 
                  WHERE  return_date > (issued_date + interval '30 day')) AS a 
ON         users.user_id = a.user_id;
