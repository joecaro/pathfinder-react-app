import React from 'react'
import styled from 'styled-components'
import '../PathfindingVisualizer/Node/Node.css'

const UIContainer = styled.div`
	background-color: #00000022;
	box-shadow: 0 0 5px #00000066;
	position: fixed;
	top: 0;
	width: 100%;
	padding: 1rem;
	display: grid;
	grid-template-columns: 200px 1fr;
	align-items: center;
	h1 {
		display: inline-block;
		margin: auto;
	}
	p {
		font-size: 2rem;
		display: inline-block;
		margin-right: 40px;
	}
	button {
		padding: 1rem;
		border-radius: 5px;
		border: 1px solid #555;
		margin: auto 10px;
		background-color: white;
		opacity: .9;
		:hover {
			opacity: 1;
		}
	}
`

const Square = styled.div`
	width: 30px;
	height: 30px;
	display: inline-block;
`

interface UIProps {
	runAlgorithm: () => void; 
	reset: () => void; 
}

export default function UI(props: UIProps) {
	const {runAlgorithm, reset} = props;

	const handleRefresh = () => {
		window.location.reload();
	}
	return (
		<UIContainer>
			<h1>UI</h1>
			<div>
				<div>
					<button onClick={runAlgorithm}>Visualize Algorithm</button>
					<button onClick={handleRefresh}>Reset</button>
				</div>
				<div>
					<Square className="node-start"></Square>
					<p>Starting Cell</p>
					<Square className="node-end"></Square>
					<p>End Cell</p>
					<Square className="node"></Square>
					<p>Traversable Cell</p>
					<Square className="node-wall"></Square>
					<p>Wall</p>
				</div>
			</div>	
		</UIContainer>
	)
}
