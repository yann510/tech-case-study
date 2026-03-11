import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { seedDatabase } from "./seed";

const DB_PATH = path.join(__dirname, "../../data.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initializeDatabase() {
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
  db.exec(schema);

  const row = db.prepare("SELECT COUNT(*) as count FROM forms").get() as {
    count: number;
  };
  if (row.count === 0) {
    seedDatabase(db);
    console.log("Database seeded with sample data");
  }
}

export default db;
