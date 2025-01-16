import { Position } from "../types";
import { sleep } from "../utils";

export const bidirectional = async (
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
  
    const startQueue: Position[] = [start];
    const endQueue: Position[] = [end];
    const startVisited = new Map<string, string>();
    const endVisited = new Map<string, string>();
    
    startVisited.set(`${start.row},${start.col}`, '');
    endVisited.set(`${end.row},${end.col}`, '');
  
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];
  
    while (startQueue.length > 0 && endQueue.length > 0) {
      // Forward search
      const currentStart = startQueue.shift()!;
      onVisit(currentStart);
      await sleep(100 - speed);
  
      for (const dir of directions) {
        const next = {
          row: currentStart.row + dir.row,
          col: currentStart.col + dir.col,
        };
  
        const key = `${next.row},${next.col}`;
        if (isValid(next) && !startVisited.has(key)) {
          startVisited.set(key, `${currentStart.row},${currentStart.col}`);
          startQueue.push(next);
  
          if (endVisited.has(key)) {
            // Path found! Reconstruct path from both ends
            const path: Position[] = [];
            let currentPos = key;
            
            // Reconstruct path from meeting point to start
            while (currentPos) {
              const [row, col] = currentPos.split(',').map(Number);
              path.unshift({ row, col });
              currentPos = startVisited.get(currentPos) ?? '';
            }
            
            // Reconstruct path from meeting point to end
            currentPos = endVisited.get(key) ?? '';
            while (currentPos) {
              const [row, col] = currentPos.split(',').map(Number);
              path.push({ row, col });
              currentPos = endVisited.get(currentPos) ?? '';
            }
            
            onPathFound(path);
            return;
          }
        }
      }
  
      // Backward search
      const currentEnd = endQueue.shift()!;
      onVisit(currentEnd);
      await sleep(100 - speed);
  
      for (const dir of directions) {
        const next = {
          row: currentEnd.row + dir.row,
          col: currentEnd.col + dir.col,
        };
  
        const key = `${next.row},${next.col}`;
        if (isValid(next) && !endVisited.has(key)) {
          endVisited.set(key, `${currentEnd.row},${currentEnd.col}`);
          endQueue.push(next);
  
          if (startVisited.has(key)) {
            // Path found! Reconstruct path from both ends
            const path: Position[] = [];
            let currentPos = key;
            
            // Reconstruct path from meeting point to start
            while (currentPos) {
              const [row, col] = currentPos.split(',').map(Number);
              path.unshift({ row, col });
              currentPos = startVisited.get(currentPos) ?? '';
            }
            
            // Reconstruct path from meeting point to end
            currentPos = endVisited.get(key) ?? '';
            while (currentPos) {
              const [row, col] = currentPos.split(',').map(Number);
              path.push({ row, col });
              currentPos = endVisited.get(currentPos) ?? '';
            }
            
            onPathFound(path);
            return;
          }
        }
      }
    }
  };