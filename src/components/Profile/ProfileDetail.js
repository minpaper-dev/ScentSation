import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import profile from '../../assets/profile.png'

const ProfileDetail = ({ userInfo }) => {
  return (
    <Container>
      <ProfileImage src={userInfo.image || profile} />
      <CustomFont size={1.4} weight={600} content={userInfo.nickname} />
      <CustomFont
        size={1.4}
        content={`${userInfo.age}세 / ${userInfo.category} / ${
          userInfo.gender === 'male' ? '남' : '여'
        }`}
        $marginTop={1}
      />
      <CustomFont size={1.4} content={'닉네임뭐로하지'} $marginTop={1} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 40%;
  height: 40%;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 100%;
  border: 1px solid ${palette.Gray300};
  background-color: white;
`

export default ProfileDetail
