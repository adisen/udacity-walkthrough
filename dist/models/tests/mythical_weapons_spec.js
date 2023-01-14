"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapons_1 = require("../mythical_weapons");
const store = new mythical_weapons_1.MythicalWeapons();
describe("Mythical Weapons Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
