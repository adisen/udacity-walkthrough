import { Request, Response, Router } from "express";
import { User, Users } from "../models/users";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const users = new Users();
const validator = new passwordValidator();
validator.is().min(8).has().uppercase().has().lowercase().has().digits();

// Register
// ROUTE: /users/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    //   Verify the input
    const body: User = req.body;
    if (!body.firstname || !body.lastname || !body.username || !body.password) {
      res.status(400).send("Invalid input");
      return;
    }

    // Check that passwords matches the requirements
    if (!validator.validate(body.password)) {
      res.status(400).send("Please enter a secure password");
      return;
    }

    //   Check if user exist
    let user = await users.getUserByUsername(body.username);
    if (user) {
      res.status(400).send("Username already taken");
      return;
    }

    //   Hash the user's password

    const hashedPassword = await bcrypt.hash(
      body.password,
      Number(process.env.SALT)
    );
    //   Add the new user to the DB
    user = await users.createUser({
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      password: hashedPassword
    });
    //   Create a token and send
    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        username: user.username
      },
      String(process.env.JWT_SECRET)
    );

    res.send(token);
    return;
  } catch (error) {
    console.log(error);
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    //   Verify the input
    const body: User = req.body;
    if (!body.username || !body.password) {
      res.status(400).send("Invalid input");
      return;
    }
    //   Check if user exist
    let user: User | null = await users.getUserByUsername(body.username);
    if (!user) {
      res.status(400).send("Invalid login details");
      return;
    }

    //   Hash the user's password

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      res.status(400).send("Invalid login details");
      return;
    }
    //   Create a token and send
    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        username: user.username
      },
      String(process.env.JWT_SECRET)
    );

    res.json({
      token,
      user: {
        ...user
      }
    });
    return;
  } catch (error) {
    console.log(error);
  }
});

export default router;
