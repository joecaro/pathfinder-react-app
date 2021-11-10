import React from 'react'
import styled from 'styled-components'

const UIContainer = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	h1 {
		display: inline-block;
		margin: 0 1rem;
	}
`

export default function UI() {
	return (
		<UIContainer>
			<h1>UI</h1>
			<button>Run Algorithm</button>
		</UIContainer>
	)
}
