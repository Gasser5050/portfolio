import type { Tile } from "../../types/Types";

export function checkWin(board: Tile[][]): boolean {
  return board.every(row => {
    return row.every(tile => {
      if (tile.mine) {
        return tile.status === "hidden" || tile.status === "marked";
      }

      return tile.status === "number";
    });
  });
}
