import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const client = await pool.connect();

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userExists = await pool.query(checkUserQuery, [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const insertUserQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(insertUserQuery, [email, hashedPassword]);

    client.release();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error("[Register]: Error registering user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const client = await pool.connect();

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(checkUserQuery, [email]);

    if (result.rows.length === 0) {
      client.release();
      return res.status(401).json({ message: "User with this email is not registered" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      client.release();
      return res.status(401).json({ message: "Password is not valid. Try again." });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "2h",
    });

    client.release();
    res.status(200).json({ token });

  } catch (error) {
    console.error("[Login]: Error authenticating user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};