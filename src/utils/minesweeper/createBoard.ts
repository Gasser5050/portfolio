import type { Tile } from "../../types/Types";

export function createBoard(
  boardSize: number,
  minesPositions: { x: number; y: number }[]
): Tile[][] {
  return Array.from({ length: boardSize }, (_, x): Tile[] => {
    return Array.from({ length: boardSize }, (_, y): Tile => {
      return {
        x,
        y,
        id: `${x}-${y}`,
        mine: minesPositions.some(p => positionMatch(p, { x, y })),
        status: "hidden"
      };
    });
  });
}

export function positionMatch(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return a.x === b.x && a.y === b.y;
}
