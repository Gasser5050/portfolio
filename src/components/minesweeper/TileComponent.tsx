import type { Tile } from "../../types/Types";

function Component({
  tile,
  markTile,
  revealTile
}: {
  tile: Tile;
  markTile: (tile: Tile) => void;
  revealTile: (tile: Tile) => void;
}) {
  return (
    <div
      data-status={tile.status}
      onContextMenu={() => markTile(tile)}
      onClick={() => revealTile(tile)}
      className="w-full h-full flex justify-center items-center text-white text-[1.5rem] md:text-[2rem] border-2 border-tiles select-none data-[status=hidden]:bg-tiles data-[status=hidden]:cursor-pointer data-[status=mine]:bg-red-600 data-[status=marked]:bg-yellow-400"
    >
      {tile.adjacentMinesCount}
    </div>
  );
}

export default Component;
