import { Request, Response, Router } from "express";
import {
  getBooks,
  createBook,
  getBook,
  deleteBook
} from "../services/booksServices";

const router = Router();

router.get("/", (req, res) => {
  const data = getBooks();
  res.send(data);
});

router.post("/", (req: Request, res: Response) => {
  const data = createBook(req.body);
  res.status(201).json({
    data: data
  });
});
router.get("/:id", getBook);

export default router;
