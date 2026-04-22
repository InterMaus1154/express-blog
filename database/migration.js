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
`);

console.log("Migrations finished");
