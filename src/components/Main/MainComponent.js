import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { MAIN_CATEGORY_WIDTH } from '../../common/size'

const MainComponent = ({ title, component }) => {
  return (
    <Container>
      <CustomFont size={1.2} weight={800} content={title} $marginBt={2} />
      {component}
    </Container>
  )
}

const Container = styled.div`
  max-width: ${`${MAIN_CATEGORY_WIDTH}rem`};
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  border-radius: 16px;
  margin: 2rem 0px;
  padding: 2rem;
`

export default MainComponent
