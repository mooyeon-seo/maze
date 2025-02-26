import { Position } from "../types";
import { sleep } from "../utils";

export const dfs = async (
  grid: any[][],
  start: Position,
  end: Position,
  onVisit: (pos: Position) => void,
  onPathFound: (path: Position[]) => void,
  speed: number,
) => {
  const rows = grid.length;
  const cols = grid[0].length;

  let foundPath = false;

  const isValid = (pos: Position) => {
    return (
      pos.row >= 0 &&
      pos.row < rows &&
      pos.col >= 0 &&
      pos.col < cols &&
      !grid[pos.row][pos.col].isWall
    );
  };

  const visited = new Set<string>();
  const parent = new Map<string, string>();
  let found = false;

  const dfsRecursive = async (current: Position) => {
    if (found) return;

    const key = `${current.row},${current.col}`;
    visited.add(key);
    onVisit(current);
    await sleep(100 - speed);

    if (current.row === end.row && current.col === end.col) {
      found = true;
      const path: Position[] = [];
      let currentPos = `${end.row},${end.col}`;

      while (currentPos) {
        const [row, col] = currentPos.split(",").map(Number);
        path.unshift({ row, col });
        currentPos = parent.get(currentPos) ?? "";
      }

      onPathFound(path);
      foundPath = true;
      return;
    }

    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    for (const dir of directions) {
      const next = {
        row: current.row + dir.row,
        col: current.col + dir.col,
      };

      const nextKey = `${next.row},${next.col}`;
      if (isValid(next) && !visited.has(nextKey)) {
        parent.set(nextKey, key);
        await dfsRecursive(next);
      }
    }
  };

  await dfsRecursive(start);
  if (!foundPath) {
    onPathFound([]);
  }
};

