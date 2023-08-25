import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const goToMain = () => {
    navigate('/', { replace: true })
  }
  return (
    <Container>
      <CustomFont size={6} weight={800} content={'404'} $marginBt={1} />
      <CustomFont size={2} weight={600} content={'페이지를 찾을 수 없습니다'} />
      <Button onClick={goToMain}>
        <CustomFont size={1.5} weight={600} content={'메인으로'} />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${palette.Brown100};
  border-radius: 1rem;
`

export default NotFound
