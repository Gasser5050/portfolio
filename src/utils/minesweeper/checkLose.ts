import type { Tile } from "../../types/Types";

export function checkLose(board: Tile[][]): boolean {
  return board.some(row => {
    return row.some(tile => {
      return tile.status === "mine";
    });
  });
}
