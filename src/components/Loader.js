import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'

const Loader = () => {
  return (
    <Container>
      <CustomFont content={'Loading ...'} />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Loader
