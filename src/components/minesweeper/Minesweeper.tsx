import TileComponent from "./TileComponent";
import { useState } from "react";
import { createBoard } from "../../utils/minesweeper/createBoard";
import { minesPositions } from "../../utils/minesweeper/minesPositions";
import { replaceTile } from "../../utils/minesweeper/replaceTile";
import { nearbyTiles } from "../../utils/minesweeper/nearbyTiles";
import { checkWin } from "../../utils/minesweeper/checkWin";
import { checkLose } from "../../utils/minesweeper/checkLose";
import type { Tile } from "../../types/Types";

const BOARD_SIZE = 10;

function Minesweeper() {
  const [safetyCheck, setSafetyCheck] = useState(true);
  const [mines, setMines] = useState(10);
  const [board, setBoard] = useState(() =>
    createBoard(BOARD_SIZE, minesPositions(BOARD_SIZE, mines))
  );
  const [boardArray, setBoardArray] = useState<Tile[][][]>([]);

  const markedTilesCount = board
    .flat()
    .filter(tile => tile.status === "marked").length;

  const win = checkWin(board);
  const lose = checkLose(board);
  const gameEnded = win || lose;

  function markTile(tile: Tile) {
    if (win || lose) return;
    if (tile.status !== "hidden" && tile.status !== "marked") return;

    const newBoard = board.map(row => row.map(t => ({ ...t })));

    if (boardArray.length === 10) {
      setBoardArray(currentBoards => [...currentBoards.slice(1), newBoard]);
    } else setBoardArray(currentBoards => [...currentBoards, newBoard]);

    if (tile.status === "hidden") {
      setBoard(currentBoard =>
        replaceTile(currentBoard, tile, { ...tile, status: "marked" })
      );
    } else
      setBoard(currentBoard =>
        replaceTile(currentBoard, tile, { ...tile, status: "hidden" })
      );
  }

  function revealTile(tile: Tile) {
    if (win || lose) return;
    if (tile.status !== "hidden") return;

    if (safetyCheck) setSafetyCheck(false);

    const newBoard: Tile[][] = safetyCheck
      ? createBoard(
          BOARD_SIZE,
          minesPositions(BOARD_SIZE, mines, { x: tile.x, y: tile.y })
        )
      : board.map(row => [...row]);

    const newBoardClone = newBoard.map(row => row.map(tile => ({ ...tile })));
    const tilesList = [newBoardClone[tile.x][tile.y]];

    while (tilesList.length > 0) {
      const currentTile = tilesList.shift()!;

      if (currentTile.mine) {
        setBoard(currentBoard => {
          return currentBoard.map(row => {
            return row.map(tile => {
              if (tile.mine) return { ...tile, status: "mine" };
              return tile;
            });
          });
        });

        return;
      }

      const adjacentTiles = nearbyTiles(newBoardClone, currentTile);
      const numberOfMines = adjacentTiles.filter(tile => tile.mine).length;

      currentTile.status = "number";
      currentTile.adjacentMinesCount = numberOfMines || "";

      if (numberOfMines === 0) {
        const restOfTiles = adjacentTiles.filter(t => t.status === "hidden");
        tilesList.push(...restOfTiles);
      }
    }

    setBoard(newBoardClone);
    setBoardArray(currentBoardArray => {
      if (currentBoardArray.length === 10) {
        return [...currentBoardArray.slice(1), newBoard];
      }
      return [...currentBoardArray, newBoard];
    });
  }

  function undoBoard() {
    if (boardArray.length === 0) return;
    if (win || lose) return;

    const lastBoard = boardArray[boardArray.length - 1];

    setBoard(lastBoard);
    setBoardArray(currentBoards => currentBoards.slice(0, -1));
  }

  return (
    <div className="flex flex-col items-center bg-background dark:bg-white text-white dark:text-black select-none pb-5">
      <h1 className="m-5 text-2xl md:text-5xl">Minesweeper</h1>
      {win && (
        <p className="text-gray-300 dark:text-black text-lg md:text-xl mb-2.5">
          You Win
        </p>
      )}
      {lose && (
        <p className="text-gray-300 dark:text-black text-lg md:text-xl mb-2.5">
          You lose
        </p>
      )}
      {!win && !lose && (
        <p className="text-gray-300 dark:text-black text-lg md:text-xl mb-2.5">
          Mines Left: {mines - markedTilesCount}
        </p>
      )}
      <div
        onContextMenu={e => e.preventDefault()}
        style={{ "--size": BOARD_SIZE } as React.CSSProperties}
        className="bg-board border-2 border-zinc-600 grid grid-cols-board-mobile grid-rows-board-mobile md:grid-cols-board md:grid-rows-board p-2 gap-1 rounded-sm"
      >
        {board.map(row => {
          return row.map(tile => {
            return (
              <TileComponent
                key={tile.id}
                tile={tile}
                markTile={markTile}
                revealTile={revealTile}
              />
            );
          });
        })}
      </div>
      <div className="flex space-x-3">
        <button
          aria-label="Undo previous tile move"
          onClick={undoBoard}
          className={`${gameEnded && "line-through"} mt-4 text-md md:text-2xl px-4 py-2 bg-gray-100 dark:bg-zinc-900 dark:text-white hover:bg-black dark:hover:bg-slate-50 text-black dark:hover:text-zinc-950 hover:text-white ring-1 ring-black dark:ring-slate-700 hover:ring-white dark:hover:ring-slate-700 rounded-lg duration-200 cursor-pointer hover:scale-[1.01]`}
        >
          Undo
        </button>
        <button
          aria-label="Reset game and generate new board"
          onClick={() => {
            setBoard(
              createBoard(BOARD_SIZE, minesPositions(BOARD_SIZE, mines))
            );
            setSafetyCheck(true);
          }}
          className="mt-4 text-md md:text-2xl px-4 py-2 bg-gray-100 dark:bg-zinc-900 dark:text-white hover:bg-black dark:hover:bg-slate-50 text-black dark:hover:text-zinc-950 hover:text-white ring-1 ring-black dark:ring-slate-700 hover:ring-white dark:hover:ring-slate-700 rounded-lg duration-200 cursor-pointer hover:scale-[1.01]"
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center items-center text-md mt-2 space-x-3">
        <label htmlFor="minesCount" className="text-md md:text-xl">
          Choose number of mines
        </label>
        <select
          name="minesCount"
          id="minesCount"
          value={mines}
          onChange={e => {
            const newMinesCount = Number(e.target.value);
            setSafetyCheck(true);
            setMines(newMinesCount);
            setBoard(
              createBoard(BOARD_SIZE, minesPositions(BOARD_SIZE, newMinesCount))
            );
            setBoardArray([]);
          }}
          className="text-center bg-white dark:bg-zinc-900 text-black dark:text-white text-sm w-10 h-5 rounded-lg cursor-pointer"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

export default Minesweeper;
