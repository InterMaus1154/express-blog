import {db} from "./db.js";

console.log("Migrations running");

db.exec(`CREATE TABLE IF NOT EXISTS users
         (
             user_id    INTEGER PRIMARY KEY AUTOINCREMENT,
             username   TEXT      NOT NULL UNIQUE,
             email TEXT NOT NULL UNIQUE,
             password   TEXT      NOT NULL,
             token      TEXT      NOT NULL,
             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
         );
`);

console.log("Migrations finished");
