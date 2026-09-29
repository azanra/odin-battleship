import type { ICoordinate } from "../interfaces/GameBoardInterface.ts";
import type { ILegalCoordinate } from "../interfaces/PlayerInterface.ts";
import type { IPredeterminedShip } from "../interfaces/ShipInterface.ts";
import Player from "../utils/Player.ts";
import Ship from "../utils/Ship.ts";

const PREDETERMINED_SHIP = () => {
  const ship: IPredeterminedShip[] = [
    {
      name: "Carrier",
      ship: Ship(5),
      coordinate: { start: [3, 3], end: [3, 7] },
      length: 5,
    },
    {
      name: "Battleship",
      ship: Ship(4),
      coordinate: { start: [6, 9], end: [9, 9] },
      length: 4,
    },
    {
      name: "Cruiser",
      ship: Ship(3),
      coordinate: { start: [8, 4], end: [8, 6] },
      length: 3,
    },
    {
      name: "Submarine",
      ship: Ship(3),
      coordinate: { start: [5, 2], end: [7, 2] },
      length: 3,
    },
    {
      name: "Destroyer",
      ship: Ship(2),
      coordinate: { start: [2, 7], end: [2, 8] },
      length: 2,
    },
  ];

  const randomizeShipCoordinate = () => {
    const getRandomCoordinate = Player().getRandomCoordinate;

    const startList: ICoordinate[] = [];
    const endList: ICoordinate[] = [];

    return ship.map((individualShip) => {
      let isUnique = false;
      let currentStart;
      let currentEnd;

      while (!isUnique) {
        const randomStartCoordinate = getRandomCoordinate();
        const randomEndCoordinate = getRandomCoordinate();

        const startItem = destructIntoArray(randomStartCoordinate);
        const endItem = destructIntoArray(randomEndCoordinate);

        if (
          !checkIfArrayContain(startList, startItem) &&
          !checkIfArrayContain(endList, endItem) &&
          isEitherHorizontalOrVertical(startItem, endItem) &&
          isEqualToShipSize(startItem, endItem, individualShip.length)
        ) {
          startList.push(startItem);
          endList.push(endItem);

          currentStart = startItem;
          currentEnd = endItem;

          isUnique = true;
        }
      }

      return {
        ...individualShip,
        coordinate: {
          start: currentStart as unknown as ICoordinate,
          end: currentEnd as unknown as ICoordinate,
        },
      };
    });
  };

  const checkIfArrayContain = (
    listArray: ICoordinate[],
    arrayItem: ICoordinate,
  ) => JSON.stringify(listArray).indexOf(JSON.stringify(arrayItem)) !== -1;

  const destructIntoArray = (coordinate: ILegalCoordinate): ICoordinate => [
    coordinate.x,
    coordinate.y,
  ];

  const isEitherHorizontalOrVertical = (
    currentStart: ICoordinate,
    currentEnd: ICoordinate,
  ) => {
    // It should be only horizontal or vertical positioned

    return (
      currentStart[0] === currentEnd[0] || currentStart[1] === currentEnd[1]
    );
  };

  const isEqualToShipSize = (
    currentStart: ICoordinate,
    currentEnd: ICoordinate,
    size: number,
  ) => {
    return (
      currentEnd[0] - currentStart[0] === size - 1 ||
      currentEnd[1] - currentStart[1] === size - 1
    );
  };

  return { ship, randomizeShipCoordinate };
};

export default PREDETERMINED_SHIP;
