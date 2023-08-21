import React from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const BottomNavi = () => {
  const auth = getAuth()
  const navigate = useNavigate()

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
      <StyleLink to={'/'}>
        <Icon>홈</Icon>
      </StyleLink>
      <StyleLink to={'/vote'}>
        <Icon>투표</Icon>
      </StyleLink>
      <Button onClick={goProfile}>마이페이지</Button>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 480px;
  height: 3rem;
  background-color: white;
  border-top: 1px solid ${palette.Gray300};
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyleLink = styled(Link)`
  flex: 1;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(480 / 3) px;
`

const Button = styled.button`
  flex: 1;
`

export default BottomNavi
