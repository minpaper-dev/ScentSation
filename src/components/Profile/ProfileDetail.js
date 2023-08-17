import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const ProfileDetail = ({ userInfo }) => {
  return (
    <Container>
      <ProfileImage src={userInfo.image} />
      <CustomFont content={userInfo.nickname} $marginTop={2} />
      <CustomFont
        content={`${userInfo.age}세 / ${userInfo.category} / ${
          userInfo.gender === 'male' ? '남' : '여'
        }`}
        $marginTop={0.5}
      />
      {/* <CustomFont content={'닉네임뭐로하지'} $marginTop={0.5} /> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  padding: 1rem;
  border-radius: 100%;
  border: 1px solid ${palette.Gray300};
  background-color: white;
`

export default ProfileDetail
