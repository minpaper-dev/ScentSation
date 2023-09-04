import React, { ChangeEvent } from 'react'
import profile from '../../assets/profile.png'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { styled } from 'styled-components'

interface ProfileImageProps {
  src: string | null | undefined
  setProfileImageUrl: React.Dispatch<React.SetStateAction<string>>
  setProfileImage: React.Dispatch<React.SetStateAction<File | undefined>>
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  setProfileImageUrl,
  setProfileImage,
}) => {
  const setProfileBase = () => {
    setProfileImageUrl(profile)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const imageUrl = URL.createObjectURL(file)
      setProfileImageUrl(imageUrl)
    }
  }

  return (
    <>
      <Image src={src || profile} />
      <FileLabel>
        <File type="file" onChange={handleImageChange} />
        <CustomFont content={'사진 선택'} $textDecoLine={'underline'} />
      </FileLabel>
      {src !== profile && (
        <Button onClick={setProfileBase}>
          <CustomFont content={'기본 이미지로 변경'} />
        </Button>
      )}
    </>
  )
}

const Image = styled.img`
  border: 1px solid ${palette.Gray400};
  width: 10rem;
  height: 10rem;
  margin: 2rem 0 0;
  border-radius: 100%;
`

const FileLabel = styled.label`
  width: 30%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const File = styled.input`
  display: none;
  width: 50%;
  margin: 0 auto;
`

const Button = styled.button``

export default ProfileImage
