import React, { useEffect, useState } from 'react'
import CustomLogo from '../components/Custom/CustomLogo'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'

const MyPage = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { getDataOne } = useFirestore()

  const MenuData = [
    {
      title: 'My ScentSation',
      event: () => navigate('/'),
    },
    {
      title: '향수 / 브랜드 제보',
      event: () => navigate('/'),
    },
    {
      title: '내 정보 수정',
      event: () => navigate('/'),
    },
    {
      title: '로그아웃',
      event: () => onLogout(),
    },
    {
      title: '탈퇴하기',
      event: () => navigate('/'),
    },
  ]

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid
        console.log(user, uid)
        getUserInfo(uid)
      }
    })
  }, [])

  const getUserInfo = async uid => {
    const result = await getDataOne('user', uid)
    console.log(result.data())
    setUserInfo(result.data())
  }

  const onLogout = () => {
    auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <>
      <Header pageName={'마이페이지'} />
      <Container>
        <FlexColCenter>
          <ProfileImage />
          <CustomFont content={userInfo.nickname} $marginTop={2} />
          <CustomFont
            content={`${userInfo.age}세 / ${userInfo.category} / ${
              userInfo.gender === 'male' ? '남' : '여'
            }`}
            $marginTop={0.5}
          />
          {/* <CustomFont content={'닉네임뭐로하지'} $marginTop={0.5} /> */}
        </FlexColCenter>
        <FlexCol>
          {MenuData.map(item => (
            <Button onClick={item.event} key={item.title}>
              <CustomFont content={item.title} />
            </Button>
          ))}
        </FlexCol>
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
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
  padding: 2rem 3rem;
`

const Button = styled.button`
  margin: 0.5rem 0;
`

export default MyPage
