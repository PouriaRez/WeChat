import { Request, Response } from "express";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const userCheck = await pool.query(
      `
        SELECT * FROM users where username = $1
        `,
      [username]
    );

    const userInfo = userCheck.rows[0];

    if (userCheck.rowCount === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const passCheck = await bcrypt.compare(password, userInfo.password);

    if (!passCheck) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const SECRET = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        userID: userInfo.id,
        username: userInfo.username,
      },
      SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to login. Please try again later.",
    });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter a Username and Password" });
    }

    const exists = await pool.query(
      `
        SELECT * FROM users WHERE username = $1
        `,
      [username]
    );

    if (exists.rowCount && exists.rowCount > 0) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username
        `,
      [username, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "An error occurred while trying to register. Please try again later.",
    });
  }
};
