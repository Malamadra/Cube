import React, { useState } from 'react'
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

const initialMatrix = Array(4)
  .fill(null)
  .map(() => [1, 1, 1, 1])

const Cube = () => {
  const [matrix, setMatrix] = useState(initialMatrix)

  const [buttonsPosition, setButtonsPosition] = useState({
    top: '61px',
    left: '61px'
  })

  const handleMouseOver = e => {
    const { offsetTop, offsetLeft } = e.currentTarget

    setButtonsPosition({
      top: `${offsetTop}px`,
      left: `${offsetLeft}px`
    })
  }

  return (
    <Wrapper>
      <Button background="orange" right="10px" top="61px">
        +
      </Button>
      <ColDeleteButton
        background="brown"
        left={buttonsPosition.left}
        top="10px"
      >
        -
      </ColDeleteButton>
      <RowsWrapper>
        {matrix.map((row, i) => (
          <Row key={i} data={row} handleMouseOver={handleMouseOver} />
        ))}
      </RowsWrapper>
      <RowDeleteButton background="brown" left="10px" top={buttonsPosition.top}>
        -
      </RowDeleteButton>
      <Button background="orange" left="61px">
        +
      </Button>
    </Wrapper>
  )
}

export default Cube
