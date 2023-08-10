import React, { useEffect } from 'react'
import CustomLogo from '../components/Custom/CustomLogo'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const MyPage = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        console.log(user, uid)

        // setUserId(uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [])

  const onLogout = () => {
    auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <Container>
      <CustomLogo />
      <FlexColCenter>
        <ProfileImage />
        <CustomFont content={'닉네임뭐로하지'} />
        <CustomFont content={'닉네임뭐로하지'} />
        <CustomFont content={'닉네임뭐로하지'} />
      </FlexColCenter>
      <FlexCol>
        <Link>
          <CustomFont content={'My ScentSation'} />
        </Link>
        <Link>
          <CustomFont content={'향수 / 브랜드 제보'} />
        </Link>
        <Link>
          <CustomFont content={'내 정보 수정'} />
        </Link>
        <Button onClick={onLogout}>
          <CustomFont content={'로그아웃'} />
        </Button>
        <Button>
          <CustomFont content={'탈퇴하기'} />
        </Button>
      </FlexCol>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  border: 1px solid black;
`

const FlexColCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Button = styled.button``

export default MyPage
