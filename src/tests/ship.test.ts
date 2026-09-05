import { describe, expect, test } from "@jest/globals";

const SHIP_LENGTH = 3;

describe("ship", () => {
  const currentShip = ship(SHIP_LENGTH);

  test("increase hit number from 0 to 3", () => {
    for (let i = 0; i <= SHIP_LENGTH; i++) {
      currentShip.hit();
    }
    expect(currentShip.getHit()).toBe(3);
  });

  test("hit is not exceeding specified length amount", () => {
    currentShip.hit();
    expect(currentShip.getHit()).toBe(3);
  });

  test("ship should sink if hit is equal to ship length", () => {
    expect(currentShip.isSunk()).toBe(true);
  });
});
