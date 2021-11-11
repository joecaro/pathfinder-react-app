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
		padding: .8rem;
		border-radius: 5px;
		border: 1px solid #555;
		margin: auto 10px;
		background-color: #3a8dc5;
		font-size: 1.5rem;
		color: #fff;
		opacity: .9;
		:hover {
			opacity: 1;
		}
	}
	div:first-of-type {
		display: flex;
		justify-content: space-between;
	}
`

const Square = styled.div`
	width: 30px;
	height: 30px;
	display: inline-block;
`

const Legend = styled.div`
 display: flex;
 align-items: center;
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
					<button style={{backgroundColor: '#ee2200'}} onClick={handleRefresh}>Reset</button>
				</div>
				<Legend>
					<Square className="node-start"></Square>
					<p>Starting Cell</p>
					<Square className="node-end"></Square>
					<p>End Cell</p>
					<Square className="node"></Square>
					<p>Traversable Cell</p>
					<Square className="node-wall"></Square>
					<p>Wall</p>
				</Legend>
			</div>	
		</UIContainer>
	)
}
