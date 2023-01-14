// @ts-ignore
import client from "../database";

export type Book = {
  id?: number;
  title: string;
  total_pages: number;
  author: string;
  type: string;
  summary: string;
};

export class Books {
  // Get Books
  async getBooks(): Promise<Book[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM books";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error when fetching books ${error}`);
    }
  }

  // Get Single Book
  async getBook(id: number): Promise<Book> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM books WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error when fetching book ${error}`);
    }
  }

  // Create Book
  async createBook(book: Book): Promise<Book> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO books (title, total_pages, author, type, summary) VALUES ($1, $2, $3, $4, $5)";
      await conn.query(sql, [
        book.title,
        book.total_pages,
        book.author,
        book.type,
        book.summary
      ]);

      const result = await this.getBooks();
      conn.release();
      return result[result.length - 1];
    } catch (error) {
      throw new Error(`Error when creating book ${error}`);
    }
  }

  // Delete Book
  async deleteBook(id: number): Promise<Book[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "DELETE FROM books WHERE id=($1)";
      await conn.query(sql, [id]);
      const result = await this.getBooks();
      conn.release();
      return result;
    } catch (error) {
      throw new Error(`Error when deleting book ${error}`);
    }
  }

  // Update Book
}
