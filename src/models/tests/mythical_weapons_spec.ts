import { Weapon, MythicalWeapons } from "../mythical_weapons";

const store = new MythicalWeapons();

describe("Mythical Weapons Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
