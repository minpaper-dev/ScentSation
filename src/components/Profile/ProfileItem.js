import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import { Link } from 'react-router-dom'

const ProfileItem = () => {
  return (
    <Link to={'/review/1'}>
      <Profile>
        <ProfileImage />
        <ProfileInfo>
          <CustomFont content={'김땡땡'} />
          <CustomFont content={'31세 / 우디 / 남'} />
        </ProfileInfo>
      </Profile>
    </Link>
  )
}

const Profile = styled.div`
  display: flex;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: ${palette.Gray100};
  margin-right: 15px;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ProfileItem
