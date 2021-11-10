import React from 'react'
import styled from 'styled-components'
import {ICell} from '../PathfindingVisualizer'

type NodeContainerProps = {
	isStart: boolean;
	isEnd: boolean;
}

const NodeContainer = styled.div<NodeContainerProps>`
	background-color: ${({isStart, isEnd}) => isStart ? 'green' : isEnd ? "red" : '#ffffff7d'};
	border-radius: 5px;
	border: 1px solid #555;
`

export default function Node(props: INodeProps) {
	return (
		<NodeContainer isStart={props.isStart} isEnd={props.isEnd}>
			<p style={{fontSize: '.5rem'}}>{props.cell.col},{props.cell.row}</p>
		</NodeContainer>
	)
}

interface INodeProps {
	isStart: boolean;
	isEnd: boolean;
	cell: ICell;
}

interface INode {
	row: number;
	col: number;
	isVisited: boolean;
}


export const DEFAULT_NODE: INode = {
	row: 0,
	col: 0,
	isVisited: false,
}