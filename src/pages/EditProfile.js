import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import { styled } from 'styled-components'
import profile from '../assets/profile.png'
import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import ProfileImage from '../components/Profile/ProfileImage'

const EditProfile = () => {
  const { getDataOne } = useFirestore()

  const [userInfo, setUserInfo] = useState({})
  const [profileImage, setProfileImage] = useState()
  const [profileImageUrl, setProfileImageUrl] = useState('')

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const uid = JSON.parse(localStorage.getItem('uid'))
    const result = await getDataOne('user', uid)
    setUserInfo(result.data())
    console.log(result.data())
  }

  return (
    <>
      <Header pageName={'내 정보 수정'} />
      <Container>
        <ProfileImage src={userInfo.image} />
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default EditProfile
