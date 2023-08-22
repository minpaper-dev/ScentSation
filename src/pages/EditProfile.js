import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import { styled } from 'styled-components'
import profile from '../assets/profile.png'
import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import ProfileImage from '../components/Profile/ProfileImage'
import ProfileForm from '../components/Profile/ProfileForm'
import ProfileGender from '../components/Profile/ProfileGender'
import Loader from '../components/Loader'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const EditProfile = () => {
  const { getDataOne, updateData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem('uid'))

  const [inputValue, setInputValue] = useState({
    gender: {
      type: 'radio',
      title: '성별',
      value: '',
    },
    nickname: {
      type: 'text',
      title: '닉네임',
      value: '',
    },
    email: {
      type: 'test',
      title: 'E-mail',
      value: '',
      readOnly: true,
    },
    age: {
      type: 'text',
      title: '나이',
      value: '',
    },
    category: {
      type: 'text',
      title: '대표 향료',
      value: '',
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [profileImage, setProfileImage] = useState()
  const [profileImageUrl, setProfileImageUrl] = useState('')

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const result = await getDataOne('user', uid)
    setInputValue({
      ...inputValue,
      gender: { ...inputValue.gender, value: result.data().gender },
      age: { ...inputValue.age, value: result.data().age },
      email: { ...inputValue.email, value: result.data().email },
      nickname: { ...inputValue.nickname, value: result.data().nickname },
      category: { ...inputValue.category, value: result.data().category },
    })
    setProfileImageUrl(result.data().image)
    setIsLoading(false)
  }

  const onChange = (e, category) => {
    setInputValue({
      ...inputValue,
      [category]: { ...inputValue[category], value: e },
    })
  }

  const renderInput = (item, index, category) => {
    return item.type === 'radio' ? (
      <ProfileGender
        category={category}
        inputInfo={inputValue}
        onChange={onChange}
      />
    ) : (
      <ProfileForm
        item={item}
        index={index}
        inputInfo={inputValue}
        onChange={onChange}
      />
    )
  }

  const OnEditBtnClick = () => {
    const storage = getStorage()
    const storageRef = ref(storage, `image/${uuidv4()}.jpg`)

    if (profileImage) {
      const uploadTask = uploadBytesResumable(storageRef, profileImage)

      uploadTask
        .then(() => getDownloadURL(uploadTask.snapshot.ref))
        .then(downloadURL => {
          onEdit(downloadURL)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      onEdit()
    }
  }

  const onEdit = async url => {
    await updateData('user', uid, {
      nickname: inputValue.nickname.value,
      age: inputValue.age.value,
      category: inputValue.category.value,
      gender: inputValue.gender.value,
      image: url,
    })
  }

  return (
    <>
      <Header pageName={'내 정보 수정'} />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <ProfileImage
            src={profileImageUrl}
            setProfileImage={setProfileImage}
            setProfileImageUrl={setProfileImageUrl}
          />
          <Grid>
            {Object.values(inputValue).map((item, index) => (
              <React.Fragment>
                <Center>
                  <CustomFont content={item.title} />
                </Center>
                {renderInput(item, index, Object.keys(inputValue)[index])}
              </React.Fragment>
            ))}
          </Grid>
          <Button onClick={OnEditBtnClick}>
            <CustomFont content={'수정하기'} />
          </Button>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
`

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 1fr;
  padding: 2rem 3rem;
  row-gap: 2rem;
  margin-bottom: 2rem;
`

const Center = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  background-color: ${palette.Brown100};
  border-radius: 1rem;
  width: 80%;
  padding: 1rem 0;
`

export default EditProfile
