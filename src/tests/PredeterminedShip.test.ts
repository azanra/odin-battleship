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

    test("coordinate not colliding with each other", () => {
      const createRange = PREDETERMINED_SHIP().createRange;
      let rangeOfCoordinate: string[] = [];

      randomizedCoordinate.forEach((item) => {
        const { coordinate } = item;
        const itemRange = createRange(coordinate.start, coordinate.end).map(
          (item) => JSON.stringify(item),
        );

        rangeOfCoordinate = [...rangeOfCoordinate, ...itemRange];
      });

      const uniqueCoordinate = new Set(rangeOfCoordinate);
      const SHIP_LENGTH_TOTAL_SIZE = 17;

      expect(uniqueCoordinate.size).toBe(SHIP_LENGTH_TOTAL_SIZE);
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

    test("create range of coordinate from start and end coordinate", () => {
      const createRange = PREDETERMINED_SHIP().createRange;

      const horizontalRange: IPredeterminedShip["coordinate"] = {
        start: [3, 3],
        end: [3, 7],
      };

      const horizontalResult = [
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
      ];

      const verticalRange: IPredeterminedShip["coordinate"] = {
        start: [6, 9],
        end: [9, 9],
      };

      const verticalResult = [
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
      ];

      expect(createRange(horizontalRange.start, horizontalRange.end)).toEqual(
        horizontalResult,
      );

      expect(createRange(verticalRange.start, verticalRange.end)).toEqual(
        verticalResult,
      );
    });
  });
});
