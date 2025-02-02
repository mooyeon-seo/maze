import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Cell {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
}

interface MazeGridProps {
  rows: number;
  cols: number;
  onCellClick: (row: number, col: number) => void;
  grid: Cell[][];
}

const MazeGrid: React.FC<MazeGridProps> = ({ rows, cols, onCellClick, grid }) => {
  // Calculate cell size based on the screen width to ensure usability on mobile
  const cellSize = Math.min(window.innerWidth / (cols + 5), 30); // maximum size of 50px

  return (
    <div className="grid gap-[1px] bg-gray-200 p-1 rounded-lg shadow-inner" 
         style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className={cn(
              "transition-all duration-200 rounded-sm cursor-pointer",
              {
                "bg-maze-wall": cell.isWall,
                "bg-maze-start": cell.isStart,
                "bg-maze-end": cell.isEnd,
                "bg-white hover:bg-gray-100": !cell.isWall && !cell.isStart && !cell.isEnd && !cell.isVisited && !cell.isPath,
                "animate-cell-visited": cell.isVisited && !cell.isPath,
                "animate-cell-path": cell.isPath,
              }
            )}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              '--visited-color': 'rgb(16, 88, 160)',
              '--path-color': 'rgb(0, 184, 148)',
            } as React.CSSProperties}
          />
        ))
      )}
    </div>
  );
};

export default MazeGrid;