import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { NO_HEADER } from '../common/data'

const Header = () => {
  const auth = getAuth()

  const [userId, setUserId] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        console.log(user, uid)
        setUserId(uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [])

  if (NO_HEADER.includes(window.location.pathname)) return null
  return (
    <Container>
      <Logo></Logo>
      <Link to={userId ? '/mypage' : '/login'}>
        <Button>
          <CustomFont content={userId ? 'MyPage' : 'Login'} />
        </Button>
      </Link>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  min-height: 100px;
  padding: 18px;
  padding-top: 40px;
`

const Logo = styled.div`
  color: #e9dacd;
`

const Button = styled.button``

export default Header
