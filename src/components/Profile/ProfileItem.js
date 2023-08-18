import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { Link } from 'react-router-dom'
import palette from '../../styles/CustomColor'

const ProfileItem = ({ data }) => {
  return (
    <Container to={`/review/${data?.id}`}>
      <Profile>
        <ProfileImage src={data?.image} />
        <ProfileInfo>
          <CustomFont content={data?.nickname} $marginBt={0.5} />
          <CustomFont
            content={`${data?.age}세 / ${data?.category} / ${data?.gender}`}
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
  &:hover {
    opacity: 0.5;
  }
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: white;
  margin-right: 15px;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ProfileItem
