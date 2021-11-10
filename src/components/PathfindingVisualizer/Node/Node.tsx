import React from 'react'
import styled from 'styled-components'
import {ICell} from '../PathfindingVisualizer'
import './Node.css';


type NodeContainerProps = {
	isStart: boolean;
	isEnd: boolean;
}

const NodeContainer = styled.div<NodeContainerProps>`
	background-color: ${({isStart, isEnd}) => isStart ? 'rgb(53, 219, 53)' : isEnd ? "rgb(255, 81, 0)" : '#ffffff7d'};
	width: 100%;
	height: 100%;
	border-radius: 5px;
	border: 2px solid #555;
`

export default function Node(props: INodeProps) {

	
	return (
		<NodeContainer isStart={props.cell.isStart} isEnd={props.cell.isEnd} id={props.id} >
		</NodeContainer>
	)
}

interface INodeProps {
	cell: ICell;
	id: string;
}

