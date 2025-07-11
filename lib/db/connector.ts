"use server";
// import Database from "better-sqlite3";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function dbConnector() {
  // Database instance with WAL mode for better concurrency

  // Initialize the database
  // if (!db) {
  const db = open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  // Create products table with proper indexes
  (await db).exec(
    `
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        currency TEXT NOT NULL,
        discountPercentage REAL,
        cartQuantity INTEGER,
        images TEXT NOT NULL,
        quantity INTEGER,
        description TEXT,
        categories TEXT NOT NULL,
        manufacturer TEXT,
        isFeatured INTEGER DEFAULT 0,
        specifications TEXT NOT NULL,
        warranty TEXT,
        reviews TEXT NOT NULL,
        createdAt INTEGER DEFAULT (strftime('%s', 'now')),
        updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    `
  );

  // Create indexes for better query performance
  (await db).exec(
    `
      CREATE INDEX IF NOT EXISTS idx_products_featured
      ON products(isFeatured)
    `
  );

  (await db).exec(
    `
      CREATE INDEX IF NOT EXISTS idx_products_price
      ON products(price)
    `
  );

  (await db).exec(
    `
      CREATE INDEX IF NOT EXISTS idx_products_manufacturer
      ON products(manufacturer)
    `
  );

  (await db).exec(
    `
      CREATE INDEX IF NOT EXISTS idx_products_categories
      ON products(categories)
    `
  );
  // }

  // Close the database connection when the process exits
  process.on("exit", async () => {
    if (await db) {
      (await db).close();
    }
  });

  return db;
}

// const handleError = (error: Error) => {
//   throw new Error("Connection failed!" + error.message);
// };

export default dbConnector;
