import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const ProfileItem = () => {
  return (
    <Profile>
      <ProfileImage />
      <ProfileInfo>
        <CustomFont size={12} content={'김땡땡'} />
        <CustomFont size={12} content={'31세 / 우디 / 남'} />
      </ProfileInfo>
    </Profile>
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
