import {db} from "./db.js";

console.log("Migrations running");

// language=SQL format=false
db.exec(`CREATE TABLE IF NOT EXISTS users
         (
             user_id    INTEGER PRIMARY KEY AUTOINCREMENT,
             username   TEXT      NOT NULL UNIQUE,
             email      TEXT      NOT NULL UNIQUE,
             password   TEXT      NOT NULL,
             token      TEXT,
             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
         );

        CREATE TABLE IF NOT EXISTS categories(
            category_id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_name TEXT NOT NULL UNIQUE,
            category_color TEXT NOT NULL
        );

        INSERT INTO categories (category_name, category_color) VALUES ('Nature', 'green'), ('Wildlife', 'purple'), ('Study', 'orange'), ('Books', 'blue'), ('Religion', 'Emerald');

        CREATE TABLE IF NOT EXISTS posts(
            post_id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_title TEXT NOT NULL,
            post_body TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS post_categories(
            category_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
            FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
        );
`);

console.log("Migrations finished");
