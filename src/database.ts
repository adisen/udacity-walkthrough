import { Client, Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const { ENV, DATABASE, USERNAME, PASSWORD, HOST, TEST_DATABASE } = process.env;

let client;

if (ENV === "dev") {
  client = new Pool({
    host: HOST,
    database: DATABASE,
    user: USERNAME,
    password: PASSWORD
  });
}

if (ENV === "test") {
  client = new Pool({
    host: HOST,
    database: TEST_DATABASE,
    user: USERNAME,
    password: PASSWORD
  });
}

export default client;
