import { positionMatch } from "./createBoard";

export function minesPositions(
  boardSize: number,
  numberOfMines: number,
  firstTileClicked?: { x: number; y: number }
) {
  const minesPositions: { x: number; y: number }[] = [];

  while (minesPositions.length < numberOfMines) {
    const tile = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize)
    };

    const isDuplicate = minesPositions.some(p => positionMatch(p, tile));
    const isFirstTile = firstTileClicked
      ? positionMatch(firstTileClicked, tile)
      : false;

    if (!isDuplicate && !isFirstTile) {
      minesPositions.push(tile);
    }
  }

  return minesPositions;
}

function randomNumber(boardSize: number) {
  return Math.floor(Math.random() * boardSize);
}
