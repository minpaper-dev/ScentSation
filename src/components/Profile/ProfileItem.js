import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { Link } from 'react-router-dom'
import palette from '../../styles/CustomColor'
import profile from '../../assets/profile.png'

const ProfileItem = ({ data }) => {
  return (
    <Container to={`/review/${data?.id}`}>
      <Profile>
        <ProfileImage src={data?.image || profile} />
        <ProfileInfo>
          <CustomFont size={1.2} content={data?.nickname} $marginBt={0.5} />
          <CustomFont
            size={1.2}
            content={`${data?.age}세 / ${data?.category} / ${
              data?.gender === 'male' ? '남' : '여'
            }`}
          />
        </ProfileInfo>
      </Profile>
    </Container>
  )
}

const Container = styled(Link)``

const Profile = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: white;
  margin-right: 1.5rem;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ProfileItem
