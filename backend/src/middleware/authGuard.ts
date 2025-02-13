import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type TokenDecoded = { email: string } & JwtPayload;

export interface CustomRequest extends Request {
  user: TokenDecoded;
}

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as TokenDecoded;
    (req as CustomRequest).user = decoded;

    next();
  } catch (error) {
    console.error("[Auth]: Authentication error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
