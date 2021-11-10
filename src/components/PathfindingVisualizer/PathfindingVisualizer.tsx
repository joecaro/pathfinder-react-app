import { type } from 'os'
import React, { useState } from 'react'
import styled from 'styled-components'
import Node, {DEFAULT_NODE} from './Node/Node'

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
	col: number,
	row: number;
	isStart: boolean;
	isEnd: boolean;
	isVisited: boolean;
	previousCell?: ICell;
	isBlocked: boolean;
	distance: number;
	isWall: boolean;
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

	return (
		<GridContainer width={grid.width} height={grid.height}>
			{grid.gridArray.map((row: ICell[], rowIndex: number) => row.map((cell: ICell, colIndex: number) => 
			<Node 
			key={`${rowIndex}-${colIndex}`} isStart={rowIndex === start.x && colIndex === start.y} isEnd={rowIndex === end.x && colIndex === end.y}	cell={cell}
			/>))}
		</GridContainer>
	)
}
