import React from 'react'
import styled from 'styled-components'

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Cell = styled.div`
  width: 50px;
  height: 50px;
  background: dodgerblue;
  margin: 1px;

  &:hover {
    opacity: 0.8;
  }
`

const Row = ({ data, handleMouseOver }) => {
  return (
    <RowWrapper>
      {data.map((number, i) => (
        <Cell key={i} onMouseOver={handleMouseOver}>{number}</Cell>
      ))}
    </RowWrapper>
  )
}

export default Row
