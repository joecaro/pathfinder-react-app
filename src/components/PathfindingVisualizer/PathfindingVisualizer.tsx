import React, { useState } from 'react'
import styled from 'styled-components'
import Node from './Node/Node'
import UI from '../UI/UI';
import dijkstra, { getCellsInShortestPath } from '../../algorithms/dijkstras';


interface ICoordinate{
	x: number;
	y: number;
  }

export interface IGrid{
	columns: number;
	rows: number;
	gridArray: ICell[][];
}

export interface ICell{
	col: number;
	row: number;
	isStart: boolean;
	isEnd: boolean;
	isVisited: boolean;
	previousCell?: ICell | null;
	isBlocked: boolean;
	distance: number;
	isWall: boolean;
}

const createCell = (col: number, row: number ): ICell => {
	return {
		col: col,
		row: row,
		isStart: col === start.x && row === start.y,
		isEnd: col === end.x && row === end.y,
		isVisited: false,
		isBlocked: false,
		distance: Infinity,
		isWall: false,
		previousCell: null,
	}
}

const columns: number = 30;
const rows: number = 20;
const start: ICoordinate = {x: 1, y: 1};
const end: ICoordinate = {x: columns - 2, y: rows - 2};

const generateArray = (columns: number, rows: number): ICell[][] => {
	const grid = [];
	for (let row = 0; row < rows; row++) {
	  const currentRow = [];
	  for (let col = 0; col < columns; col++) {
		currentRow.push(createCell(col, row));
	  }
	  grid.push(currentRow);
	}
	
	return grid;
}

const initialGrid: IGrid = {
	columns: columns,
	rows: rows,
	gridArray: generateArray(columns, rows,),
}



type GridProps = {
	  columns: number;
	  rows: number;
  }


const GridContainer = styled.div<GridProps>`
	display: grid;
	grid-template-columns: ${({columns}) => `repeat(${columns}, 1fr)`};
	grid-template-rows: ${({rows}) => `repeat(${rows}, 1fr)`};
	width: ${({columns}) => `${columns * 30}px`};
	height: ${({rows}) => `${rows * 30}px`};
	li { 
		list-style-type: none;
	}
`
export default function PathfindingVisualizer() {
	const [grid, setGrid] = useState(initialGrid)

	const handleSetAsWall = (element: HTMLElement) => {
			if (element.className === ('node-wall')) {
				element.className = "node"
			} else {
				element.className = "node-wall"
			}
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
		console.log(e.currentTarget.value);
		
		const row = Math.floor(e.currentTarget.value / 30)
		const column = (e.currentTarget.value - (row * 30));
		const element: HTMLElement | null = document.getElementById
		(`${row}-${column}`);		
		if (element !== null){
			handleSetAsWall(element)
		}
	
	}

	const runAlgorithm = () => {
		let visitedNodesInOrder: ICell[] = dijkstra(grid.gridArray, grid.gridArray[start.y][start.x], grid.gridArray[end.y][end.x] )

		animateAlgorithm(visitedNodesInOrder)
	}

	const animateAlgorithm = (visitedCellsInOrder: ICell[]) => {
		for (let i = 0; i < visitedCellsInOrder.length; i++) {
			if (i === visitedCellsInOrder.length - 1) {
				setTimeout(() => {
					animatePath(visitedCellsInOrder)
				}, 10 * i)
			}
			setTimeout(() => {
				const node = visitedCellsInOrder[i];
				const element: HTMLElement | null = document.getElementById(`${node.row}-${node.col}`)
				if (element !== null){
					element.className = 'node-visited';
				}
			}, 10 * i)
		}
	}

	const animatePath = (visitedCellsInOrder: ICell[]) => {
		let cellPath = getCellsInShortestPath(visitedCellsInOrder[visitedCellsInOrder.length - 1]);

		for (let i = 0; i < cellPath.length - 1; i++) {
		setTimeout(() => {
			const element: HTMLElement | null = document.getElementById(`${cellPath[i].row}-${cellPath[i].col}`)
				if (element !== null){
					element.className = 'node-path';
				}
		}, 50 * i)
		}
	}

	return (
		<>
		<UI runAlgorithm={runAlgorithm}/>
		<GridContainer columns={grid.columns} rows={grid.rows}>
			{grid.gridArray.map((row: ICell[], rowIndex: number) => row.map((cell: ICell, colIndex: number) => 
			<li value={(colIndex) + ((rowIndex * 30))} onMouseDown={handleMouseDown}>
			<Node 
			key={`${rowIndex}-${colIndex}`} cell={cell} id={`${rowIndex}-${colIndex}`}
			/>
			</li>
			))}
		</GridContainer>
		</>
	)
}
