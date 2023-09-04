import React, { ReactNode } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

interface MainComponentProps {
  title: string
  component: ReactNode
}

const MainComponent: React.FC<MainComponentProps> = ({ title, component }) => {
  return (
    <Container>
      <CustomFont size={1.8} weight={800} content={title} $marginBt={2} />
      {component}
    </Container>
  )
}

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${palette.Brown100};
  border-radius: 1.6rem;
  margin: 2rem 0px;
  padding: 2rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

export default MainComponent
