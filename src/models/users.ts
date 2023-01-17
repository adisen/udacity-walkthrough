// @ts-ignore
import client from "../database";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class Users {
  // Get all users
  async getUsers(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }

  // Get single user by id
  async getUser(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user by id ${error}`);
    }
  }

  // Get single user by username
  async getUserByUsername(username: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE username='${username}'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user by username ${error}`);
    }
  }

  // Create user
  // Get single user by username
  async createUser(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO users(firstname, lastname, username, password) VALUES('${user.firstname}', '${user.lastname}', '${user.username}', '${user.password}')`;
      await conn.query(sql);
      const result = await this.getUserByUsername(user.username);
      conn.release();
      return result;
    } catch (error) {
      throw new Error(`Cannot get user by username ${error}`);
    }
  }
}
