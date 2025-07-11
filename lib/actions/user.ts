/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import { loginUserSchema, createUserSchema } from "../db/models/User";
// import { createUserSchema, loginUserSchema } from "../validation/user.schema";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";

export const CreateUser = cache (async (req: Request) => {
  logger.info("Register user request received", { body: req.body });
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    console.warn("Validation failed for register user", { error: parsed.error });
    return parsed.error;
  }

  // try {
  //   const db = await dbConnector();
  //   const { firstName, lastName, email, password } = parsed.data;

  //   // Check if user already exists
  //   logger.debug("Checking if user already exists", { email });
  //   const existingUser = await db.get(
  //     "SELECT id FROM users WHERE email = ?",
  //     email
  //   );
  //   if (existingUser) {
  //     logger.warn("Registration attempt with existing email", { email });
  //     res.status(409).json({ error: "Email already registered" });
  //     return;
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   logger.info("Creating new user", { email, firstName });
  //   await db.exec(
  //     `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
  //     firstName,
  //     lastName,
  //     email,
  //     hashedPassword
  //   );

  //   logger.info("User registered successfully", { email });
  //   res.status(201).json({ message: "User registered successfully" });
  // } catch (err: any) {
  //   logger.error("Error during user registration", {
  //     error: err.message,
  //     stack: err.stack,
  //   });

  //   if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
  //     logger.warn("Duplicate email registration attempt", {
  //       email: parsed.data.email,
  //     });
  //     res.status(409).json({ error: "Email already registered" });
  //     return;
  //   }
  //   res.status(500).json({ error: "Server error", details: err });
  //   return;
  // }
});

export const loginUser = async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);
  console.info('Login request received', { data: req.body });

  if (!parsed.success) {
    console.warn('Validation failed for login', { error: parsed.error });
   return parsed.error;
  }

  try {
    const db = await dbConnector();
    const { email, password } = parsed.data;

    console.debug('Looking up user for login', { email });
    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (!user) {
      console.warn('Login attempt with non-existent email', { email });
      return { error: "Invalid credentials" };
    }

    console.debug('Comparing passwords for login');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn('Invalid password attempt', { email });
      return { error: "Invalid credentials" };
    }

    console.info('User logged in successfully', { userId: user.id, email });
    return {
      message: "Login successful",
      user: { id: user.id, email: user.email },
    };
  } catch (err) {
    console.error('Error during user login', { error: err instanceof Error ? err.message : err });
    return { error: "Server error", details: err };
  }
};

export const getUsers = async (_: Request, res: Response) => {
  console.info('Get all users request received');

  try {
    const db = await dbConnector();
    console.debug('Fetching all users from database');
    const users = await db.all(
      "SELECT id, firstName, lastName, email FROM users"
    );

    logger.info('Successfully retrieved users', { count: users.length });
    return users;
  } catch (err) {
    logger.error('Error fetching users', { error: err instanceof Error ? err.message : err });
    return { error: "Server error", details: err };
  }
};
