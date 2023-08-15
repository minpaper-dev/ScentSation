import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import CustomFont from '../styles/CustomFont'
import { NO_HEADER } from '../common/data'

const Header = ({ pageName }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goSearch = () => {
    navigate('/search')
  }

  if (NO_HEADER.includes(window.location.pathname)) return null
  return (
    <Container>
      <Icon onClick={goBack}>뒤로</Icon>
      <CustomFont content={pageName} weight={800} />
      <Icon onClick={goSearch}>검색</Icon>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  min-height: 5rem;
  padding: 2rem;
`

const Icon = styled.button``

export default Header
