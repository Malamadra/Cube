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

const Row = ({ data, handleMouseOver, handleCoordinatesSet, rowIndex }) => {
  return (
    <RowWrapper>
      {data.map(({ id, value }, colIndex) => (
        <Cell key={id} onMouseOver={(e) => {
          handleCoordinatesSet({
            rowIndex,
            colIndex
          })
          handleMouseOver(e)
        }}>{value}</Cell>
      ))}
    </RowWrapper>
  )
}

export default Row
