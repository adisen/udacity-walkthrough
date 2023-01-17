import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload extends Request {
  user: any;
}

const verifyToken = (req: Payload, res: Response, next: NextFunction) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(400).json({
      message: "Unauthroized, please pass in a token"
    });
  }

  try {
    const decoded = jwt.verify(String(token), String(process.env.JWT_SECRET));
    req.user = decoded;
  } catch (error) {
    res.status(401).json({
      message: "Token invalid"
    });
  }

  return next();
};

export default verifyToken;
