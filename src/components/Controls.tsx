import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Algorithm } from '@/lib/types';

interface ControlsProps {
  onStartVisualization: () => void;
  onClearGrid: () => void;
  onGenerateMaze: () => void;
  onSpeedChange: (value: number[]) => void;
  onAlgorithmChange: (value: Algorithm) => void;
  speed: number;
  algorithm: Algorithm;
  isVisualizing: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onStartVisualization,
  onClearGrid,
  onGenerateMaze,
  onSpeedChange,
  onAlgorithmChange,
  speed,
  algorithm,
  isVisualizing,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <Select
        value={algorithm}
        onValueChange={onAlgorithmChange}
        disabled={isVisualizing}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="astar">A* Algorithm</SelectItem>
          <SelectItem value="bfs">Breadth First Search</SelectItem>
          <SelectItem value="dfs">Depth First Search</SelectItem>
          <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
          <SelectItem value="bidirectional">Bidirectional Search</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex gap-2">
        <Button
          onClick={onStartVisualization}
          disabled={isVisualizing}
          className="flex-1"
        >
          Start Visualization
        </Button>
        <Button
          onClick={onClearGrid}
          variant="outline"
          disabled={isVisualizing}
          className="flex-1"
        >
          Clear Grid
        </Button>
      </div>
      
      <Button
        onClick={onGenerateMaze}
        variant="secondary"
        disabled={isVisualizing}
        className="w-full"
      >
        Generate Random Maze
      </Button>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Animation Speed</label>
        <Slider
          defaultValue={[speed]}
          max={100}
          min={1}
          step={1}
          onValueChange={onSpeedChange}
          disabled={isVisualizing}
        />
      </div>
    </div>
  );
};

export default Controls;