export const generateMaze = (rows: number, cols: number): boolean[][] => {
    const maze: boolean[][] = Array(rows)
      .fill(false)
      .map(() => Array(cols).fill(true));
  
    const recursiveBacktrack = (row: number, col: number) => {
      const directions = [
        { row: -2, col: 0 },
        { row: 2, col: 0 },
        { row: 0, col: -2 },
        { row: 0, col: 2 },
      ];
      
      maze[row][col] = false;
      
      const shuffledDirections = directions.sort(() => Math.random() - 0.5);
  
      for (const dir of shuffledDirections) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;
        
        if (
          newRow > 0 &&
          newRow < rows - 1 &&
          newCol > 0 &&
          newCol < cols - 1 &&
          maze[newRow][newCol]
        ) {
          maze[row + dir.row / 2][col + dir.col / 2] = false;
          recursiveBacktrack(newRow, newCol);
        }
      }
    };
  
    recursiveBacktrack(1, 1);
    return maze;
  };