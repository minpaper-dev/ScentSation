import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'

const MainComponent = ({ title, component }) => {
  return (
    <Container>
      <CustomFont weight={800} content={title} marginBt={25} />
      {component}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  border-radius: 16px;
  margin: 20px 25px 0px;
  padding: 20px 24px;
`

export default MainComponent
