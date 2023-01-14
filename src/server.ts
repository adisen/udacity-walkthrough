import express, { Request, Response } from "express";
import booksRoutes from "./routes/booksRoutes";
import usersRoutes from "./routes/usersRoutes";
import auth from "./middlewares/auth";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

// Endpoints
app.use("/books", auth, booksRoutes);
app.use("/users", usersRoutes);
// app.use("/auth");

app.get("/", function (req: Request, res: Response) {
  res.json({
    error: "You are not authorized"
  });
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
