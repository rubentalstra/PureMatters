-- CREATE TABLE products
-- (
--     id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT
--     'ID',
--     name VARCHAR
--     (255) COMMENT 'name',
--     category VARCHAR
--     (100) COMMENT 'category',
--     color VARCHAR
--     (100) COMMENT 'color',
--     size VARCHAR
--     (50) COMMENT 'size',
--     amount int COMMENT 'amount',
--     create_time DATETIME COMMENT 'Create Time' NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     update_time DATETIME COMMENT 'Update Time' NOT NULL DEFAULT CURRENT_TIMESTAMP ON
--     UPDATE CURRENT_TIMESTAMP
--     ) DEFAULT CHARSET UTF8 COMMENT 'products';

-- INSERT INTO products
--     (
--     name,
--     category,
--     color,
--     size
--     )
-- VALUES
--     (
--         'wollen sokken 2',
--         'sokken',
--         'rood',
--         'S'
--     );


-- UPDATE products SET
--     amount = 15
--     WHERE 
--     id = 1;


-- CREATE TABLE product_history
-- (
--  ph_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   id INT NOT NULL,
--   new_amount INT NOT NULL,
--   old_amount INT NOT NULL,
--   diff_amount INT NOT NULL,
--   last_modified_dt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
--  ) DEFAULT CHARSET UTF8 COMMENT 'product_history';


-- DROP TRIGGER products_history_insert

-- CREATE TRIGGER products_history_insert
-- AFTER
-- UPDATE ON products FOR EACH ROW
-- BEGIN
--         IF NEW.amount != OLD.amount THEN  
--                 insert into product_history
--         (id, new_amount, old_amount, diff_amount)
--     values
--         (old.id, new.amount, old.amount, (new.amount - old.amount));
--         END IF;
-- END;



-- CREATE TRIGGER trg_t1
-- ON t1
-- AFTER INSERT, UPDATE
-- AS
-- IF ( UPDATE (c1) )
-- BEGIN
-- UPDATE t1
-- SET c3 = c3 + 1
-- WHERE id IN (SELECT DISTINCT id FROM inserted)
-- END;