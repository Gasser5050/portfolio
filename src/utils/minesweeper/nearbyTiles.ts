import type { Tile } from "../../types/Types";

export function nearbyTiles(board: Tile[][], { x, y }: Tile) {
  const offsets = [-1, 0, 1];

  return offsets
    .flatMap(xoffset => {
      return offsets.map(yoffset => {
        return board[x + xoffset]?.[y + yoffset];
      });
    })
    .filter(tile => tile);
}
