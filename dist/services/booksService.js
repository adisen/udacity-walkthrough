"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const books_1 = require("../models/books");
const book = new books_1.Books();
async function getBooks() {
    const books = await book.getBooks();
    return books;
}
exports.getBooks = getBooks;
async function getBook(id) {
    const books = await book.getBook(id);
    return books;
}
exports.getBook = getBook;
async function createBook(newbook) {
    const books = await book.createBook(newbook);
    return books;
}
exports.createBook = createBook;
async function deleteBook(id) {
    const books = await book.deleteBook(id);
    return books;
}
exports.deleteBook = deleteBook;
