import React from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CustomFont from '../styles/CustomFont'

const BottomNavi = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const goToPage = page => {
    navigate(page)
  }

  const goProfile = () => {
    let userId = ''
    onAuthStateChanged(auth, user => {
      if (user) {
        userId = user.uid
        navigate('/mypage')
      } else {
        navigate('/login')
      }
    })
  }

  return (
    <Container>
      <Button onClick={() => goToPage('/')}>
        <CustomFont size={1.6} weight={600} content={'홈'} />
      </Button>
      <Button onClick={() => goToPage('/vote')}>
        <CustomFont size={1.6} weight={600} content={'투표'} />
      </Button>
      <Button onClick={goProfile}>
        <CustomFont size={1.6} weight={600} content={'프로필'} />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: 48rem;
  height: 6rem;
  background-color: white;
  border-top: 1px solid ${palette.Gray300};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  flex: 1;
`

export default BottomNavi
