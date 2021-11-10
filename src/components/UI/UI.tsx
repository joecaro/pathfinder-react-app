import React from 'react'
import styled from 'styled-components'

const UIContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	h1 {
		display: inline-block;
		margin: 0 1rem;
	}
	button {
		padding: 1rem;
		border-radius: 5px;
		border: 1px solid #555;
		margin: auto 10px;
	}
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
			<button onClick={runAlgorithm}>Visualize Algorithm</button>
			<button onClick={handleRefresh}>Reset</button>
		</UIContainer>
	)
}
