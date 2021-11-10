import { type } from 'os'
import React, { useState } from 'react'
import styled from 'styled-components'
import Node from './Node/Node'
import UI from '../UI/UI';
import dijkstra from '../../algorithms/dijkstras';


interface ICoordinate{
	x: number;
	y: number;
  }

export interface IGrid{
	width: number;
	height: number;
	gridArray: ICell[][];
}

export interface ICell{
	col: number;
	row: number;
	isStart: boolean;
	isEnd: boolean;
	isVisited: boolean;
	previousCell?: ICell;
	isBlocked: boolean;
	distance: number;
	isWall: boolean;
}

const DEFAULT_NODE: ICell = {
	col: 0,
	row: 0,
	isStart: false,
	isEnd: false,
	isVisited: false,
	isBlocked: false,
	distance: 0,
	isWall: false,
}

const createCell = (col: number, row: number ): ICell => {
	return {
		col: col,
		row: row,
		isStart: row === start.x && col === start.y,
		isEnd: row === end.x && col === end.y,
		isVisited: false,
		isBlocked: false,
		distance: Infinity,
		isWall: false,
	}
}

const width: number = 30;
const height: number = 20;
const start: ICoordinate = {x: 1, y: 1};
const end: ICoordinate = {x: height - 2, y: width - 2};

const generateArray = (width: number, height: number): ICell[][] => {
	const grid = [];
	for (let row = 0; row < height; row++) {
	  const currentRow = [];
	  for (let col = 0; col < width; col++) {
		currentRow.push(createCell(col, row));
	  }
	  grid.push(currentRow);
	}
	return grid;
}

const initialGrid: IGrid = {
	width: width,
	height: height,
	gridArray: generateArray(width, height,),
}



type GridProps = {
	  width: number;
	  height: number;
  }


const GridContainer = styled.div<GridProps>`
	display: grid;
	grid-template-columns: ${({width}) => `repeat(${width}, 1fr)`};
	grid-template-rows: ${({height}) => `repeat(${height}, 1fr)`};
	width: ${({width}) => `${width * 30}px`};
	height: ${({height}) => `${height * 30}px`};
`
export default function PathfindingVisualizer() {
	const [grid, setGrid] = useState(initialGrid)

const runAlgorithm = () => {
	let visitedNodesInOrder: ICell[] = dijkstra(grid.gridArray, grid.gridArray[start.x][start.y], grid.gridArray[end.x][end.y] )

	animateAlgorithm(visitedNodesInOrder)
}

const animateAlgorithm = (visitedCellsInOrder: ICell[]) => {
	for (let i = 0; i < visitedCellsInOrder.length; i++) {
		setTimeout(() => {
			const node = visitedCellsInOrder[i];
			const element: HTMLElement | null = document.getElementById(`${node.row}-${node.col}`)
			if (element !== null){
				element.className = 'node-visited';
			}
		}, 10 * i)
	}
}

	return (
		<>
		<UI runAlgorithm={runAlgorithm}/>
		<GridContainer width={grid.width} height={grid.height}>
			{grid.gridArray.map((row: ICell[], rowIndex: number) => row.map((cell: ICell, colIndex: number) => 
			<Node 
			key={`${rowIndex}-${colIndex}`} isStart={rowIndex === start.x && colIndex === start.y} isEnd={rowIndex === end.x && colIndex === end.y}	cell={cell} id={`${rowIndex}-${colIndex}`}
			/>))}
		</GridContainer>
		</>
	)
}
