import type { NextRange } from "../interfaces/GameBoardInterface";

export const HORIZONTAL_NEXT_RANGE: NextRange[] = [
  {
    start: [-1, -1],
    end: [-1, 1],
  },
  {
    start: [1, -1],
    end: [1, 1],
  },
];

export const VERTICAL_NEXT_RANGE: NextRange[] = [
  {
    start: [-1, -1],
    end: [1, -1],
  },
  {
    start: [-1, 1],
    end: [1, 1],
  },
];
