import "vite/client";

export type Tile = {
  x: number;
  y: number;
  id: string;
  mine: boolean;
  status: "hidden" | "marked" | "number" | "mine";
  adjacentMinesCount?: number | "";
};
