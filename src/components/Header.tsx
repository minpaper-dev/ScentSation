import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import CustomFont from '../styles/CustomFont'
import { NO_HEADER } from '../common/data'
import arrowIcon from '../assets/icon_chevron_left.png'
import searchIcon from '../assets/icon_search.png'

const Header = ({ pageName }: { pageName: string }) => {
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
      <Icon onClick={goBack}>
        <Image src={arrowIcon} />
      </Icon>
      <CustomFont weight={600} size={1.6} content={pageName} />
      <Icon onClick={goSearch}>
        <Image src={searchIcon} />
      </Icon>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  min-height: 5rem;
  padding: 2.6rem;
`

const Icon = styled.button``

const Image = styled.img`
  width: 2.5rem;
`

export default Header
