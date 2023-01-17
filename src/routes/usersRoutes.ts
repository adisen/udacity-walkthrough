import { Router, Request, Response } from "express";
import passwordValidator from "password-validator";
import bcryt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Users } from "../models/users";

const router = Router();
const users = new Users();
const validator = new passwordValidator();

validator.is().min(8).has().uppercase().has().lowercase().has().digits();

type LoginData = {
  username: string;
  password: string;
};

// Register route
router.post("/register", async (req: Request, res: Response) => {
  const userData: User = req.body;

  try {
    // Check that input is not empty
    if (
      !userData.firstname ||
      !userData.lastname ||
      !userData.password ||
      !userData.username
    ) {
      res.status(400).json({
        message: "Invalid input data"
      });
      return;
    }

    // Validate your password
    if (!validator.validate(userData.password)) {
      res.status(400).json({
        message:
          "Please type in a password with an uppercase, lowercase and a digist and must be of length greater than 8"
      });
      return;
    }

    // Check if user already exist
    let user = await users.getUserByUsername(userData.username);
    if (user) {
      res.status(400).json({
        message: "Username already taken, try another username"
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcryt.hash(
      userData.password,
      Number(process.env.SALT)
    );

    // Add the new user to our DB
    user = await users.createUser({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      password: hashedPassword
    });

    // Json Web token
    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        id: user.id
      },
      String(process.env.JWT_SECRET)
    );

    res.json({
      token: token,
      user: { ...user }
    });
  } catch (error) {
    console.log(error);
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const userData: LoginData = req.body;

  try {
    // Check that input is not empty
    if (!userData.password || !userData.username) {
      res.status(400).json({
        message: "Please enter your username and password"
      });
      return;
    }

    // Check if user already exist
    let user = await users.getUserByUsername(userData.username);

    if (!user) {
      res.status(400).json({
        message: "Your username or password is incorrect"
      });
      return;
    }

    // Hash password
    const match = await bcryt.compare(userData.password, user.password);

    if (!match) {
      res.status(400).json({
        message: "Your username or password is incorrect"
      });
      return;
    }

    // Json Web token
    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        id: user.id
      },
      String(process.env.JWT_SECRET)
    );

    res.json({
      token: token,
      user: { ...user, password: "_" }
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
