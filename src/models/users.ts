import client from "../database";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class Users {
  // Get Users
  async getUsers(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error when fetching fetch users ${error}`);
    }
  }

  // Get User
  async getUser(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error when fetching fetch users ${error}`);
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE username='${username}'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error when fetching fetch users ${error}`);
    }
  }

  // Create User
  async createUser(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      console.log(user.password);
      const sql = `INSERT INTO users (firstname, lastname, username, password) VALUES('${user.firstname}', '${user.lastname}', '${user.username}', '${user.password}')`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error when creating users ${error}`);
    }
  }
}
