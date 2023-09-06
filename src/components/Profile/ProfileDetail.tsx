import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import profile from '../../assets/profile.png'
import { UserInterface } from '../../pages/Main'

const ProfileDetail = ({
  userInfo,
}: {
  userInfo: UserInterface | undefined
}) => {
  if (!userInfo) return <></>
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
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 15rem;
  height: 15rem;
  margin: 2rem 0;
  border-radius: 100%;
  border: 1px solid ${palette.Gray300};
  background-color: white;
`

export default ProfileDetail
