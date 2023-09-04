import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
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
import { MY_UID } from '../common/localstorage'
import CustomModal from '../components/Custom/CustomModal'
import { useNavigate } from 'react-router-dom'
import SelectCategory from '../components/Profile/SelectCategory'
import { UserInterface } from './Main'

export interface InputValueInterface {
  gender: {
    type: string
    title: string
    value: string | undefined
    readOnly?: boolean
  }
  nickname: {
    type: string
    title: string
    value: string | undefined
    readOnly?: boolean
  }
  email: {
    type: string
    title: string
    value: string | undefined
    readOnly?: boolean
  }
  age: {
    type: string
    title: string
    value: string | number | undefined
    readOnly?: boolean
  }
  category: {
    type: string
    title: string
    value: string | undefined
    readOnly?: boolean
  }
  [key: string]: any
}

const EditProfile = () => {
  const navigate = useNavigate()
  const { updateData, getDataWithId } = useFirestore()

  const uid = JSON.parse(localStorage.getItem(MY_UID) || 'null')

  const [inputValue, setInputValue] = useState<InputValueInterface>({
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
  const [isModal, setIsModal] = useState(false)
  const [isCategoryModal, setIsCategoryModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [profileImage, setProfileImage] = useState<File | undefined>()
  const [profileImageUrl, setProfileImageUrl] = useState<string>('')

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const result: UserInterface | undefined = await getDataWithId('user', uid)
    if (result) {
      setInputValue({
        ...inputValue,
        gender: { ...inputValue.gender, value: result.gender },
        age: { ...inputValue.age, value: result.age },
        email: { ...inputValue.email, value: result.email },
        nickname: { ...inputValue.nickname, value: result.nickname },
        category: { ...inputValue.category, value: result.category },
      })
      if (result.image) {
        setProfileImageUrl(result.image)
      }
    }

    setIsLoading(false)
  }

  const onChange = (e: string, category: string) => {
    setInputValue({
      ...inputValue,
      [category]: { ...inputValue[category], value: e },
    })
  }

  const renderInput = (
    item: InputValueInterface[keyof InputValueInterface],
    index: number,
    category: string
  ) => {
    return item.title === '성별' ? (
      <ProfileGender
        category={category}
        inputInfo={inputValue}
        onChange={onChange}
      />
    ) : item.title === '대표 향료' ? (
      <WrapInput>
        <Input
          $bgc={item?.readOnly}
          type={item.type}
          readOnly={true}
          value={item.value}
          onClick={() => setIsCategoryModal(true)}
        />
      </WrapInput>
    ) : (
      <ProfileForm
        item={item}
        onChange={onChange}
        category={Object.keys(inputValue)[index]}
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
      onEdit(profileImageUrl)
    }
  }

  const onEdit = async (url: string | unknown) => {
    await updateData('user', uid, {
      nickname: inputValue.nickname.value,
      age: inputValue.age.value,
      category: inputValue.category.value,
      gender: inputValue.gender.value,
      image: url,
    })
    onModalHandler()
  }

  const onModalHandler = () => {
    setIsModal(true)
    setTimeout(() => {
      setIsModal(false)
      navigate(-1)
    }, 1500)
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
            <CustomFont size={1.4} weight={800} content={'수정하기'} />
          </Button>
          {isCategoryModal && (
            <SelectCategory
              setIsCategoryModal={setIsCategoryModal}
              onChange={onChange}
            />
          )}
          {isModal && <CustomModal content={'수정이 완료되었습니다.'} />}
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
  display: block;
  background-color: ${palette.Brown100};
  padding: 1.5rem 0;
  width: 80%;
  margin: 2rem auto 0;
  border-radius: 1rem;
`

const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Input = styled.input<{ $bgc: boolean | undefined }>`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${palette.Gray100};
  padding: 1.2rem;
  font-size: 0.8rem;
  background-color: ${props => (props.$bgc ? palette.Gray400 : 'white')};
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`

export default EditProfile
