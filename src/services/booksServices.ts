import { Request, Response } from "express";
import { Books, Book } from "../models/books";

const book = new Books();

export const getBooks = async (): Promise<Book[]> => {
  const books = await book.getBooks();
  return books;
};

export const getBook = () => {};
export const createBook = (book: Book) => {};
export const deleteBook = () => {};
