import { ICell } from "../components/PathfindingVisualizer/PathfindingVisualizer";

export default function dijkstra(
  grid: ICell[][],
  startNode: ICell,
  finishNode: ICell
): ICell[] {
  const visitedCellsInOrder: ICell[] = [];
  startNode.distance = 0;
  const unvisitedCells: ICell[] = getAllCells(grid);
  console.log(grid.length);
  console.log(grid[0].length);

  while (!!unvisitedCells.length) {
    sortCellsByLength(unvisitedCells);
    const closestNode: ICell = unvisitedCells[0];
    unvisitedCells.shift();
    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) {
      console.log("Stuck");

      return visitedCellsInOrder;
    }
    closestNode.isVisited = true;
    visitedCellsInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedCellsInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
  return visitedCellsInOrder;
}

const getUnvisitedNeighbors = (cell: ICell, grid: ICell[][]): ICell[] => {
  const unvisitedNeighbors: ICell[] = [];
  const { col, row } = cell;
  console.log(`getting visitors at ${row} ${col}`);
  if (row > 0) unvisitedNeighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) unvisitedNeighbors.push(grid[row + 1][col]);
  if (col > 0) unvisitedNeighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) unvisitedNeighbors.push(grid[row][col + 1]);

  return unvisitedNeighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (cell: ICell, grid: ICell[][]) => {
  const unvisitedNeighbors: ICell[] = getUnvisitedNeighbors(cell, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previousCell = cell;
  }
};

const sortCellsByLength = (unvisitedCells: ICell[]) => {
  unvisitedCells.sort((cellA, cellB) => cellA.distance - cellB.distance);
};

const getAllCells = (grid: ICell[][]): ICell[] => {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
};

export function getCellsInShortestPath(endCell: ICell) {
  const cellsInShortestPath: ICell[] = [];
  let currentCell: ICell | null | undefined = endCell;
  while (currentCell !== null && currentCell !== undefined) {
    cellsInShortestPath.unshift(currentCell);
    currentCell = currentCell.previousCell;
  }
  return cellsInShortestPath;
}

export {};
