import type { IShip } from "./ShipInterface";

// https://stackoverflow.com/a/79224862
// Only accept number range from 0 - 9, exponentially grow to specified size recursively
export type ShipCoordinateRange<Acc extends number[] = []> =
  Acc["length"] extends 10
    ? Acc[number]
    : ShipCoordinateRange<[...Acc, Acc["length"]]>;

type BoardItem = {
  ship: undefined | IShip;
  isAttacked: boolean;
};

// https://stackoverflow.com/a/60762482
// exponentially grow to specified size recursively
type GrowToSize<T, N extends number, A extends T[]> = A["length"] extends N
  ? A
  : GrowToSize<T, N, [...A, T]>;

type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

// [[BoardItem, ...9x] ...9x,]
export type IBoard = FixedArray<FixedArray<BoardItem, 10>, 10>;

export type ICoordinate = [ShipCoordinateRange, ShipCoordinateRange];

export interface IRangeOfCoordinate {
  range: ICoordinate;
  expected: "undefined" | "exist";
}
