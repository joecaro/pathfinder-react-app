import React from 'react'
import styled from 'styled-components'
import {ICell} from '../PathfindingVisualizer'
import './Node.css';


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
		<NodeContainer isStart={props.cell.isStart} isEnd={props.cell.isEnd} id={props.id} >
			<p style={{fontSize: '.5rem'}}>{props.cell.col},{props.cell.row}</p>
		</NodeContainer>
	)
}

interface INodeProps {
	cell: ICell;
	id: string;
}

