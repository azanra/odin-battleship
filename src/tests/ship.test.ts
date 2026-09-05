import { describe, expect, test } from "@jest/globals";
import Ship from "../utils/ship";

const SHIP_LENGTH = 3;

describe("ship", () => {
  const currentShip = Ship(SHIP_LENGTH);

  const increaseHitToShipLength = () => {
    for (let i = 0; i < SHIP_LENGTH; i++) {
      currentShip.hit();
    }
  };

  test("increase hit number from 0 to 3", () => {
    increaseHitToShipLength();
    expect(currentShip.getHit()).toBe(3);
  });

  test("hit is not exceeding specified length amount", () => {
    increaseHitToShipLength();
    expect(currentShip.getHit()).toBe(3);
  });

  test("ship should sink if hit is equal to ship length", () => {
    expect(currentShip.isSunk()).toBe(true);
  });
});
