import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface RequestWithUser extends Request {
  user: string | jwt.JwtPayload | undefined;
}

export const authToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Go to the header, grab the token from the bearer token.
    const token = req.headers.authorization?.split(" ")[1];

    // If the token doesn't exist, we want to throw an error because the user
    // is not verified.
    if (!token) {
      return res.status(401).json({ error: "User is not authorized." });
    }

    const SECRET = process.env.JWT_SECRET as string;

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or Expired token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error authenticating your token.",
    });
  }
};
