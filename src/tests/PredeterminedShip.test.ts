import { describe, expect, test } from "@jest/globals";
import PREDETERMINED_SHIP from "../constants/predeterminedShip";
import type { IPredeterminedShip } from "../interfaces/ShipInterface";

describe("Predetermined Ship", () => {
  describe("randomize coordinate in horizontally or vertically", () => {
    const randomizedCoordinate: IPredeterminedShip[] =
      PREDETERMINED_SHIP().randomizeShipCoordinate();

    test("no duplicate coordinate", () => {
      const listOfStart = new Set(
        randomizedCoordinate.map((shipCoordinate) =>
          JSON.stringify(shipCoordinate.coordinate.start),
        ),
      );

      const listOfEnd = new Set(
        randomizedCoordinate.map((shipCoordinate) =>
          JSON.stringify(shipCoordinate.coordinate.end),
        ),
      );

      expect(listOfStart.size === 5 && listOfEnd.size === 5).toBe(true);
    });

    randomizedCoordinate.forEach((shipCoordinate) => {
      const { coordinate, length } = shipCoordinate;
      const { start, end } = coordinate;

      test("coordinate is either horizontal or vertical", () => {
        expect(start[0] === end[0] || start[1] === end[1]).toBe(true);
      });

      test("coordinate is equal to ship length", () => {
        expect(
          end[0] - start[0] === length - 1 || end[1] - start[1] === length - 1,
        ).toBe(true);
      });
    });
  });
});
