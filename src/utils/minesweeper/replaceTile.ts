import type { Tile } from "../../types/Types";
import { positionMatch } from "./createBoard";

export function replaceTile(board: Tile[][], oldTile: Tile, newTile: Tile) {
  return board.map(row =>
    row.map(currentTile =>
      positionMatch(currentTile, oldTile) ? newTile : currentTile
    )
  );
}
