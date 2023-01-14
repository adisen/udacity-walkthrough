"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _a = process.env, ENV = _a.ENV, DATABASE = _a.DATABASE, USERNAME = _a.USERNAME, PASSWORD = _a.PASSWORD, HOST = _a.HOST, TEST_DATABASE = _a.TEST_DATABASE;
var client;
if (ENV === "dev") {
    client = new pg_1.Pool({
        host: HOST,
        database: DATABASE,
        user: USERNAME,
        password: PASSWORD
    });
}
if (ENV === "test") {
    client = new pg_1.Pool({
        host: HOST,
        database: TEST_DATABASE,
        user: USERNAME,
        password: PASSWORD
    });
}
exports["default"] = client;
