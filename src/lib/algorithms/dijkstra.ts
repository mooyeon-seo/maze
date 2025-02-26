import { Position, Cell } from "../types";
import { sleep } from "../utils";

export const dijkstra = async (
  grid: Cell[][],
  start: Position,
  end: Position,
  onVisit: (pos: Position) => void,
  onPathFound: (path: Position[]) => void,
  speed: number,
) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const isValid = (pos: Position) => {
    return (
      pos.row >= 0 &&
      pos.row < rows &&
      pos.col >= 0 &&
      pos.col < cols &&
      !grid[pos.row][pos.col].isWall
    );
  };

  const distances = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(Infinity));
  distances[start.row][start.col] = 0;

  const parent = new Map<string, string>();
  const unvisited = new Set<string>();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row][col].isWall) {
        unvisited.add(`${row},${col}`);
      }
    }
  }

  while (unvisited.size > 0) {
    let minDist = Infinity;
    let current = "";

    for (const pos of unvisited) {
      const [row, col] = pos.split(",").map(Number);
      if (distances[row][col] < minDist) {
        minDist = distances[row][col];
        current = pos;
      }
    }

    if (minDist === Infinity) break;

    const [currentRow, currentCol] = current.split(",").map(Number);
    onVisit({ row: currentRow, col: currentCol });
    await sleep(100 - speed);

    if (currentRow === end.row && currentCol === end.col) {
      const path: Position[] = [];
      let currentPos = `${end.row},${end.col}`;

      while (currentPos) {
        const [row, col] = currentPos.split(",").map(Number);
        path.unshift({ row, col });
        currentPos = parent.get(currentPos) ?? "";
      }

      onPathFound(path);
      return;
    }

    unvisited.delete(current);

    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    for (const dir of directions) {
      const nextRow = currentRow + dir.row;
      const nextCol = currentCol + dir.col;
      const next = { row: nextRow, col: nextCol };

      if (isValid(next)) {
        const newDist = distances[currentRow][currentCol] + 1;
        if (newDist < distances[nextRow][nextCol]) {
          distances[nextRow][nextCol] = newDist;
          parent.set(`${nextRow},${nextCol}`, `${currentRow},${currentCol}`);
        }
      }
    }
  }
  onPathFound([]);
};
