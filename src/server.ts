import express, { Request, Response } from "express";
import booksRoutes from "./routes/booksRoutes";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

// Endpoints
app.use("/books", booksRoutes);
// app.use("/auth");

app.get("/", function (req: Request, res: Response) {
  res.json({
    error: "You are not authorized"
  });
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
