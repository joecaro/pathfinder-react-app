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
const start: ICoordinate = {x: Math.floor(columns / 4), y: rows/2};
const end: ICoordinate = {x: Math.floor(columns / 4 * 3), y: rows/2};

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
	gap: 2px;
	li { 
		list-style-type: none;
	}
`
export default function PathfindingVisualizer() {
	const [grid, setGrid] = useState(initialGrid)

	const handleChangeClass = (element: HTMLElement, className: string) => {
		if (className === "node-start" || className === "node-end") {
			element.className = className
		} else {

			if (element.className === (className)) {
				element.className = "node"
			} else {
				element.className = className
			}
		}
	}

	const handleGetRowAndColumnFromValue = (val: number): number[] => {
		const row = Math.floor(val / 30)
		const column = (val - (row * 30));
	
		return [row, column]
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
		console.log(e.currentTarget.value);
		
		const [row, column] = handleGetRowAndColumnFromValue(e.currentTarget.value)
		
		const element: HTMLElement | null = document.getElementById
		(`${row}-${column}`);		
		if (element !== null){
			handleChangeClass(element, "node-wall")
		}

		grid.gridArray[row][column].isBlocked = !grid.gridArray[row][column].isBlocked
	
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
				if (element !== null && !grid.gridArray[node.row][node.col].isStart && !grid.gridArray[node.row][node.col].isEnd){
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
				if (element !== null && !grid.gridArray[cellPath[i].row][cellPath[i].col].isStart && !grid.gridArray[cellPath[i].row][cellPath[i].col].isEnd){
					element.className = 'node-path';
				}
		}, 50 * i)
		}
	}

	const reset = () => {
		const totalCells = (columns * rows);
		for (let i = 0; i < totalCells - 1; i++) {
			const [row, column] = handleGetRowAndColumnFromValue(i)
			if (grid.gridArray[row][column].isStart) {
				const element: HTMLElement | null = document.getElementById(`${row}-${column}`);		
				if (element !== null){
					handleChangeClass(element, "node-start")
				}
			} else if (grid.gridArray[row][column].isEnd) {
				const element: HTMLElement | null = document.getElementById(`${row}-${column}`);		
				if (element !== null){
					handleChangeClass(element, "node-end")
				}
			} else {
				const element: HTMLElement | null = document.getElementById(`${row}-${column}`);		
				if (element !== null){
					grid.gridArray[row][column].isBlocked = false;
					handleChangeClass(element, "node");
				}
			}
		}
	}

	return (
		<>
		<UI runAlgorithm={runAlgorithm} reset={reset}/>
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
