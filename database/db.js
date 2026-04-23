import Database from 'better-sqlite3';

const __dirname = import.meta.dirname;

export const db = new Database(__dirname + "/blog.db");
db.pragma("foreign_keys = ON");

