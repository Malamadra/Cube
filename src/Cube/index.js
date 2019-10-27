import React, { useState } from 'react'
import uuid from 'uuid'
import styled from 'styled-components'
import Row from './Row'

const Button = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: ${({ background }) => background && background};
  color: #fff;
  ${({ top }) => top && `top: ${top}`};
  ${({ bottom }) => bottom && `bottom: ${bottom}`};
  ${({ left }) => left && `left: ${left}`};
  ${({ right }) => right && `right: ${right}`};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`

const ColDeleteButton = styled(Button)`
  transition: left 0.3s ease-out;
  display: none;
`

const RowDeleteButton = styled(Button)`
  transition: top 0.3s ease-out;
  display: none;
`

const RowsWrapper = styled.div``

const Wrapper = styled.div`
  padding: 60px;
  position: relative;

  &:hover {
    ${RowDeleteButton} {
      display: flex;
    }

    ${ColDeleteButton} {
      display: flex;
    }
  }
`

const generateRow = size =>
  Array(size)
    .fill(null)
    .map(() => {
      const id = uuid()

      return {
        id,
        value: id[0]
      }
    })

const initialMatrix = Array(4)
  .fill(null)
  .map(() => generateRow(4))

const Cube = () => {
  const [matrix, setMatrix] = useState(initialMatrix)

  const [buttonsPosition, setButtonsPosition] = useState({
    top: '61px',
    left: '61px'
  })

  const [coordinates, setCoordinates] = useState({
    rowIndex: null,
    colIndex: null
  })

  const handleMouseOver = e => {
    const { offsetTop, offsetLeft } = e.currentTarget

    setButtonsPosition({
      top: `${offsetTop}px`,
      left: `${offsetLeft}px`
    })
  }

  const handleRowAdd = () =>
    setMatrix(currentMatrix => [
      ...currentMatrix,
      generateRow(currentMatrix[0].length)
    ])

  const handleColumnAdd = () => {
    setMatrix(currentMatrix =>
      currentMatrix.map(arr => {
        const id = uuid()
        const cell = {
          id,
          value: id[0]
        }

        return [...arr, cell]
      })
    )
  }

  const handleRowDelete = () => {
    if (matrix.length > 1) {
      setMatrix(currentMatrix =>
        currentMatrix.filter((_, i) => i !== coordinates.rowIndex)
      )
    }
  }

  const handleColumnDelete = () => {
    if (matrix[0].length > 1) {
      setMatrix(currentMatrix =>
        currentMatrix.map(arr =>
          arr.filter((_, i) => i !== coordinates.colIndex)
        )
      )
    }
  }

  return (
    <Wrapper>
      <Button
        background="orange"
        right="10px"
        top="61px"
        onClick={handleColumnAdd}
      >
        +
      </Button>
      <ColDeleteButton
        background="brown"
        left={buttonsPosition.left}
        top="10px"
        onClick={handleColumnDelete}
      >
        -
      </ColDeleteButton>
      <RowsWrapper>
        {matrix.map((row, i) => (
          <Row
            key={i}
            rowIndex={i}
            data={row}
            handleMouseOver={handleMouseOver}
            handleCoordinatesSet={setCoordinates}
          />
        ))}
      </RowsWrapper>
      <RowDeleteButton
        background="brown"
        left="10px"
        top={buttonsPosition.top}
        onClick={handleRowDelete}
      >
        -
      </RowDeleteButton>
      <Button background="orange" left="61px" onClick={handleRowAdd}>
        +
      </Button>
    </Wrapper>
  )
}

export default Cube
