import React, { useState, useCallback, useEffect } from 'react';
import MazeGrid from '@/components/MazeGrid';
import Controls from '@/components/Controls';
import { toast } from 'sonner';
import { Position } from '@/lib/types';
import { generateMaze } from '@/lib/algorithms/generateMaze';
import { astar } from '@/lib/algorithms/astar';
import { bfs } from '@/lib/algorithms/bfs';
import { dfs } from '@/lib/algorithms/dfs';
import { dijkstra } from '@/lib/algorithms/dijkstra';
import { wallFollower } from '@/lib/algorithms/wallFollower';
import { recursiveBacktracking } from '@/lib/algorithms/recursiveBacktracking';
import { bidirectional } from '@/lib/algorithms/bidirectional';
import { Algorithm } from '@/lib/types';

const GRID_ROWS = 25;
const GRID_COLS = 35;

interface Cell {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
}

const Index = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState<Algorithm>('astar');
  const [startPos, setStartPos] = useState<Position>({ row: 1, col: 1 });
  const [endPos, setEndPos] = useState<Position>({ row: GRID_ROWS - 2, col: GRID_COLS - 2 });
  const [placementMode, setPlacementMode] = useState<'wall' | 'start' | 'end'>('wall');

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_ROWS)
      .fill(null)
      .map((_, row) =>
        Array(GRID_COLS)
          .fill(null)
          .map((_, col) => ({
            row,
            col,
            isWall: false,
            isStart: row === startPos.row && col === startPos.col,
            isEnd: row === endPos.row && col === endPos.col,
            isVisited: false,
            isPath: false,
          }))
      );
    setGrid(newGrid);
  }, [startPos, endPos]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const handleCellClick = (row: number, col: number) => {
    if (isVisualizing) return;

    setGrid(prevGrid => {
      const newGrid = [...prevGrid.map(row => [...row])];
      const cell = newGrid[row][col];

      if (placementMode === 'wall') {
        if (!cell.isStart && !cell.isEnd) {
          cell.isWall = !cell.isWall;
        }
      } else if (placementMode === 'start') {
        const oldStart = newGrid[startPos.row][startPos.col];
        oldStart.isStart = false;
        cell.isStart = true;
        cell.isWall = false;
        setStartPos({ row, col });
        setPlacementMode('wall');
      } else if (placementMode === 'end') {
        const oldEnd = newGrid[endPos.row][endPos.col];
        oldEnd.isEnd = false;
        cell.isEnd = true;
        cell.isWall = false;
        setEndPos({ row, col });
        setPlacementMode('wall');
      }

      return newGrid;
    });
  };

  const clearGrid = () => {
    initializeGrid();
  };

  const generateRandomMaze = () => {
    const maze = generateMaze(GRID_ROWS, GRID_COLS);
    setGrid(prevGrid => {
      const newGrid = [...prevGrid.map(row => [...row])];
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          newGrid[row][col].isWall = maze[row][col];
          newGrid[row][col].isVisited = false;
          newGrid[row][col].isPath = false;
        }
      }
      return newGrid;
    });
  };

  const visualizePathfinding = async () => {
    if (!startPos || !endPos) {
      toast.error('Please set start and end positions');
      return;
    }

    setIsVisualizing(true);
    setGrid(prevGrid => {
      const newGrid = [...prevGrid.map(row => [...row])];
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          newGrid[row][col].isVisited = false;
          newGrid[row][col].isPath = false;
        }
      }
      return newGrid;
    });

    try {
      const onVisit = (pos: Position) => {
        setGrid(prevGrid => {
          const newGrid = [...prevGrid.map(row => [...row])];
          if (!newGrid[pos.row][pos.col].isStart && !newGrid[pos.row][pos.col].isEnd) {
            newGrid[pos.row][pos.col].isVisited = true;
          }
          return newGrid;
        });
      };

      const onPathFound = (path: Position[]) => {
        setGrid(prevGrid => {
          const newGrid = [...prevGrid.map(row => [...row])];
          path.forEach(pos => {
            if (!newGrid[pos.row][pos.col].isStart && !newGrid[pos.row][pos.col].isEnd) {
              newGrid[pos.row][pos.col].isPath = true;
            }
          });
          return newGrid;
        });
        toast.success('Path found!');
      };

      switch (algorithm) {
        case 'astar':
          await astar(grid, startPos, endPos, onVisit, onPathFound, speed);
          break;
        case 'bfs':
          await bfs(grid, startPos, endPos, onVisit, onPathFound, speed);
          break;
        case 'dfs':
          await dfs(grid, startPos, endPos, onVisit, onPathFound, speed);
          break;
        case 'dijkstra':
          await dijkstra(grid, startPos, endPos, onVisit, onPathFound, speed);
          break;
        case 'bidirectional':
          await bidirectional(grid, startPos, endPos, onVisit, onPathFound, speed);
          break;
      }
    } catch (error) {
      toast.error('No path found!');
    } finally {
      setIsVisualizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">I'm finding a way to get back to you, pinky grid!</h1>
          <p className="text-gray-600">
            Click to draw walls, visualize pathfinding algorithms, and generate random mazes
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPlacementMode('start')}
              className={`px-4 py-2 rounded-md ${
                placementMode === 'start' ? 'bg-maze-start text-white' : 'bg-white'
              }`}
            >
              Place Start
            </button>
            <button
              onClick={() => setPlacementMode('end')}
              className={`px-4 py-2 rounded-md ${
                placementMode === 'end' ? 'bg-maze-end text-white' : 'bg-white'
              }`}
            >
              Place End
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-8">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <MazeGrid
              rows={GRID_ROWS}
              cols={GRID_COLS}
              grid={grid}
              onCellClick={handleCellClick}
            />
          </div>
          
          <Controls
            onStartVisualization={visualizePathfinding}
            onClearGrid={clearGrid}
            onGenerateMaze={generateRandomMaze}
            onSpeedChange={([value]) => setSpeed(value)}
            onAlgorithmChange={setAlgorithm}
            speed={speed}
            algorithm={algorithm}
            isVisualizing={isVisualizing}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;