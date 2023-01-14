"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = require("../books");
const store = new books_1.Books();
describe("Books Model", () => {
    it("should have a getBooks method", () => {
        expect(store.getBooks).toBeDefined();
    });
    it("should have a getBook method", () => {
        expect(store.getBook).toBeDefined();
    });
    it("should have a createBook method", () => {
        expect(store.createBook).toBeDefined();
    });
    it("should have a deleteBook method", () => {
        expect(store.deleteBook).toBeDefined();
    });
    it("createBook method should add a book", async () => {
        const result = await store.createBook({
            title: "Half of a Yello Sun",
            total_pages: 459,
            author: "CNA",
            summary: "African",
            type: "Fiction"
        });
        expect(result).toEqual({
            id: 1,
            title: "Half of a Yello Sun",
            total_pages: 459,
            author: "CNA",
            summary: "African",
            type: "Fiction"
        });
    });
    it("getBooks method should return a list of books", async () => {
        const result = await store.getBooks();
        expect(result).toEqual([
            {
                id: 1,
                title: "Half of a Yello Sun",
                total_pages: 459,
                author: "CNA",
                summary: "African",
                type: "Fiction"
            }
        ]);
    });
    it("getBook method should return a book", async () => {
        const result = await store.getBook(1);
        expect(result).toEqual({
            id: 1,
            title: "Half of a Yello Sun",
            total_pages: 459,
            author: "CNA",
            summary: "African",
            type: "Fiction"
        });
    });
    it("deleteBook method should remove the book", async () => {
        const result = await store.deleteBook(1);
        // const result = await store.getBooks();
        expect(result).toEqual([]);
    });
});
