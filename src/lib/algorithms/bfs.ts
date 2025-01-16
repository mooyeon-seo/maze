import { Position } from "../types";
import { sleep } from "../utils";

export const bfs = async (
  grid: any[][],
  start: Position,
  end: Position,
  onVisit: (pos: Position) => void,
  onPathFound: (path: Position[]) => void,
  speed: number
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

  const queue: Position[] = [start];
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  
  visited.add(`${start.row},${start.col}`);

  while (queue.length > 0) {
    const current = queue.shift()!;
    onVisit(current);
    await sleep(100 - speed);

    if (current.row === end.row && current.col === end.col) {
      const path: Position[] = [];
      let currentPos = `${end.row},${end.col}`;
      
      while (currentPos) {
        const [row, col] = currentPos.split(',').map(Number);
        path.unshift({ row, col });
        currentPos = parent.get(currentPos) ?? '';
      }
      
      onPathFound(path);
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

      const key = `${next.row},${next.col}`;
      if (isValid(next) && !visited.has(key)) {
        visited.add(key);
        parent.set(key, `${current.row},${current.col}`);
        queue.push(next);
      }
    }
  }
};