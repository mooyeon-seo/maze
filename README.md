# Maze Solver Application

This is a Next.js application that implements multiple algorithms to solve mazes. The app supports the following algorithms:

- **DFS (Depth-First Search)**
- **BFS (Breadth-First Search)**
- **Dijkstra**
- **A\* (A-star)**
- **Bidirectional Search**

Each algorithm solves mazes and visualizes the solution on the frontend.

## TLDR

Just try it out on [maze.insufficient.ca](http://maze.insufficient.ca)

## Requirements

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- A modern browser for the frontend

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/mooyeon-seo/maze-solver.git
   ```

2. Navigate into the project directory:
   ```bash
   cd maze-solver
   ```

3. Install dependencies:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
# Or using yarn:
yarn dev
```

The app should now be running at `http://localhost:3000`. Open it in your browser to interact with the maze-solving algorithms.

## How to Use

1. On the homepage, you will see a grid representing a maze.
2. Select an algorithm from the dropdown menu.
3. Click on **Solve** to run the selected algorithm on the maze.
4. The app will visualize the path found by the algorithm, and display the number of steps, or show a "no solution" message if no path is found.

### Supported Algorithms

- **DFS (Depth-First Search)**: A graph traversal algorithm that explores as far as possible along each branch before backtracking.
- **BFS (Breadth-First Search)**: A graph traversal algorithm that explores all nodes at the present depth level before moving on to nodes at the next depth level. It guarantees the shortest path if one exists.
- **Dijkstra**: A greedy algorithm for finding the shortest paths between nodes in a graph, where edges have non-negative weights.
- **A* (A-star)**: A best-first search algorithm that combines features of BFS and heuristics to find the shortest path more efficiently.
- **Wall Follower (Left-hand and Right-hand Rule)**: A simple algorithm where you follow one wall (left or right) continuously until you reach the exit.
- **Recursive Backtracking**: A DFS-based approach where the algorithm explores paths recursively, backtracking when it hits dead ends.
- **Bidirectional Search**: A search algorithm that simultaneously searches from the start and the goal until the two searches meet in the middle, reducing the search space.

## Testing

To run tests (if any are configured for the project), use the following command:

```bash
npm run test
# Or using yarn:
yarn test
```

## Deployment

To build and deploy the app for production:

1. Build the app:
   ```bash
   npm run build
   # Or using yarn:
   yarn build
   ```

2. To start the production server locally:
   ```bash
   npm run start
   # Or using yarn:
   yarn start
   ```

Alternatively, you can deploy the app using services like Vercel, Netlify, or your preferred hosting platform.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes. Make sure to write tests and document your code.

## License

This project is licensed under the MIT License
