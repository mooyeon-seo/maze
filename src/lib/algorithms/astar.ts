import { Position } from "../types";
import { sleep } from "../utils";

export const manhattanDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
};

export const astar = async (
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
  
    const getNeighbors = (pos: Position): Position[] => {
      const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ];
      
      return directions
        .map(dir => ({
          row: pos.row + dir.row,
          col: pos.col + dir.col,
        }))
        .filter(isValid);
    };
  
    const openSet = new Set<string>([`${start.row},${start.col}`]);
    const cameFrom = new Map<string, string>();
    
    const gScore = new Map<string, number>();
    gScore.set(`${start.row},${start.col}`, 0);
    
    const fScore = new Map<string, number>();
    fScore.set(`${start.row},${start.col}`, manhattanDistance(start, end));
  
    while (openSet.size > 0) {
      let current = Array.from(openSet)
        .map(pos => {
          const [row, col] = pos.split(',').map(Number);
          return { row, col };
        })
        .reduce((a, b) => {
          const aScore = fScore.get(`${a.row},${a.col}`) ?? Infinity;
          const bScore = fScore.get(`${b.row},${b.col}`) ?? Infinity;
          return aScore < bScore ? a : b;
        });
  
      if (current.row === end.row && current.col === end.col) {
        const path: Position[] = [];
        let currentPos = `${end.row},${end.col}`;
        
        while (currentPos) {
          const [row, col] = currentPos.split(',').map(Number);
          path.unshift({ row, col });
          currentPos = cameFrom.get(currentPos) ?? '';
        }
        
        onPathFound(path);
        return;
      }
  
      openSet.delete(`${current.row},${current.col}`);
      onVisit(current);
      await sleep(100 - speed);
  
      for (const neighbor of getNeighbors(current)) {
        const tentativeGScore =
          (gScore.get(`${current.row},${current.col}`) ?? Infinity) + 1;
  
        if (
          tentativeGScore <
          (gScore.get(`${neighbor.row},${neighbor.col}`) ?? Infinity)
        ) {
          cameFrom.set(
            `${neighbor.row},${neighbor.col}`,
            `${current.row},${current.col}`
          );
          gScore.set(`${neighbor.row},${neighbor.col}`, tentativeGScore);
          fScore.set(
            `${neighbor.row},${neighbor.col}`,
            tentativeGScore + manhattanDistance(neighbor, end)
          );
          openSet.add(`${neighbor.row},${neighbor.col}`);
        }
      }
    }
  };
  