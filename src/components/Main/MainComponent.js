import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { MAIN_CATEGORY_WIDTH } from '../../common/size'
import palette from '../../styles/CustomColor'

const MainComponent = ({ title, component }) => {
  return (
    <Container>
      <CustomFont size={1.2} weight={800} content={title} $marginBt={2} />
      {component}
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${palette.Brown100};
  border-radius: 16px;
  margin: 2rem 0px;
  padding: 2rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

export default MainComponent
