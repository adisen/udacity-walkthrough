"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythicalWeapons = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class MythicalWeapons {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM mythical_weapons";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannon get weapons ${error}`);
        }
    }
}
exports.MythicalWeapons = MythicalWeapons;
