import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import profile from '../assets/profile.png'

import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import CustomLogo from '../components/Custom/CustomLogo'
import { v4 as uuidv4 } from 'uuid'

import useFirestore from '../hooks/useFirestore'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import ProfileGender from '../components/Profile/ProfileGender'
import ProfileForm from '../components/Profile/ProfileForm'
import ProfileImage from '../components/Profile/ProfileImage'
import SelectCategory from '../components/Profile/SelectCategory'
import { useQuery } from 'react-query'
import CustomModal from '../components/Custom/CustomModal'

const Signup = () => {
  const { addData, getDataAll } = useFirestore()
  const auth = getAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { oauth = '', uid = '', nickname = '', email = '' } = state || {}

  const { data: userData } = useQuery({
    queryKey: 'user',
    queryFn: () => getDataAll('user'),
    initialData: [],
  })

  const userNickname = userData.map(v => v.nickname)
  const userEmail = userData.map(v => v.email)

  const [profileImage, setProfileImage] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState(profile)
  const [isCategoryModal, setIsCategoryModal] = useState(false)
  const [isCompleteModal, setIsCompleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    gender: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    age: '',
    category: '',
  })

  const [inputInfo, setInputInfo] = useState({
    gender: { type: 'radio', title: '성별', value: '', placeholder: '' },
    nickname: {
      type: 'text',
      title: '닉네임',
      value: nickname ? nickname : '',
      placeholder: '닉네임을 입력해주세요.',
    },
    email: {
      type: 'text',
      title: 'E-mail',
      value: email ? email : '',
      placeholder: 'E-mail을 입력해주세요.',
      readOnly: oauth ? true : false,
    },
    password: {
      type: 'password',
      title: '비밀번호',
      value: '',
      placeholder: '비밀번호를 입력해주세요. (6자리 이상)',
      hidden: oauth ? true : false,
    },
    passwordCheck: {
      type: 'password',
      title: '비밀번호 확인',
      value: '',
      placeholder: '비밀번호를 한번 더 입력해주세요.',
      hidden: oauth ? true : false,
    },
    age: {
      type: 'text',
      title: '나이',
      value: '',
      placeholder: '나이를 입력해주세요.',
    },
    category: {
      type: 'text',
      title: '대표 향료',
      value: '',
      placeholder: '대표 향료를 선택해주세요.',
      readOnly: true,
    },
  })

  useEffect(() => {
    checkError()
  }, [inputInfo])

  const checkError = () => {
    let copyError = { ...errorMessage }
    if (userNickname.includes(inputInfo.nickname.value))
      copyError = { ...copyError, nickname: '이미 존재하는 닉네임입니다.' }
    else {
      copyError = { ...copyError, nickname: '' }
    }
    if (userEmail.includes(inputInfo.email.value))
      copyError = { ...copyError, email: '이미 존재하는 이메일입니다.' }
    else {
      copyError = { ...copyError, email: '' }
    }
    if (
      inputInfo.passwordCheck.value.length > 0 &&
      inputInfo.password.value !== inputInfo.passwordCheck.value
    ) {
      copyError = {
        ...copyError,
        passwordCheck: '비밀번호가 일치하지 않습니다.',
      }
    } else {
      copyError = {
        ...copyError,
        passwordCheck: '',
      }
      if (
        inputInfo.age.value.length > 0 &&
        !Number.isInteger(+inputInfo.age.value)
      )
        copyError = { ...copyError, age: '숫자만 입력해주세요' }
      else {
        copyError = { ...copyError, age: '' }
      }
    }
    setErrorMessage(copyError)
  }

  const renderInput = (item, category, index) => {
    return (
      <>
        {item.title === '성별' ? (
          <ProfileGender
            category={category}
            inputInfo={inputInfo}
            onChange={onChange}
            errorMessage={errorMessage}
          />
        ) : item.title === '대표 향료' ? (
          <WrapInput>
            <Input
              $bgc={item.readOnly}
              type={item.type}
              placeholder={item.placeholder}
              readOnly={item.readOnly}
              value={item.value}
              onClick={() => setIsCategoryModal(true)}
            />
            <Error>
              <CustomFont
                color={palette.Red200}
                content={errorMessage.category}
                weight={600}
              />
            </Error>
          </WrapInput>
        ) : (
          <ProfileForm
            item={item}
            inputInfo={inputInfo}
            onChange={onChange}
            category={Object.keys(inputInfo)[index]}
            errorMessage={errorMessage}
          />
        )}
      </>
    )
  }

  const onSignup = async (url = '') => {
    try {
      let userId = uid ?? ''
      if (!userId) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          inputInfo.email.value,
          inputInfo.password.value
        )
        userId = user.uid
      }

      await addData('user', userId, {
        auth: oauth ? oauth : 'email',
        email: email ? email : inputInfo.email.value,
        nickname: inputInfo.nickname.value,
        password: inputInfo.password.value,
        age: inputInfo.age.value,
        gender: inputInfo.gender.value,
        category: inputInfo.category.value,
        // major: inputInfo.perfume.value,
        image: url,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onModalHandler = () => {
    setIsCompleteModal(true)
    setTimeout(() => {
      navigate('/', { replace: true })
      setIsCompleteModal(false)
    }, 1500)
  }

  const onChange = (e, category) => {
    setInputInfo({
      ...inputInfo,
      [category]: { ...inputInfo[category], value: e },
    })
  }

  const handleUpload = () => {
    onModalHandler()
    const storage = getStorage()
    const storageRef = ref(storage, `image/${uuidv4()}.jpg`)

    if (profileImage) {
      const uploadTask = uploadBytesResumable(storageRef, profileImage)

      uploadTask
        .then(() => getDownloadURL(uploadTask.snapshot.ref))
        .then(downloadURL => {
          onSignup(downloadURL)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      onSignup()
    }
  }

  return (
    <Container>
      <Wrap>
        <CustomLogo $marginTop={5} />
        <ProfileImage
          src={profileImageUrl}
          setProfileImageUrl={setProfileImageUrl}
          setProfileImage={setProfileImage}
        />

        <FormGrid>
          {Object.values(inputInfo).map(
            (item, index) =>
              // Google 회원가입일 경우 비밀번호, 비밀번호 확인 보여지지 않도록 설정
              !item.hidden && (
                <React.Fragment key={item.title}>
                  <Center>
                    <CustomFont
                      color={palette.Brown500}
                      weight={600}
                      content={item.title}
                      size={1.2}
                    />
                  </Center>
                  {renderInput(item, Object.keys(inputInfo)[index], index)}
                </React.Fragment>
              )
          )}
        </FormGrid>
      </Wrap>
      <SignupButton onClick={handleUpload}>
        <CustomFont size={1.4} weight={800} content={'회원가입'} />
      </SignupButton>
      {isCategoryModal && (
        <SelectCategory
          setIsCategoryModal={setIsCategoryModal}
          onChange={onChange}
        />
      )}
      {isCompleteModal && (
        <CustomModal content={'회원가입이 완료되었습니다.'} />
      )}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10rem;
`

const FormGrid = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 8rem 1fr;
  padding: 2rem 3rem;
  row-gap: 3rem;
`

const SignupButton = styled.button`
  display: block;
  background-color: ${palette.Brown100};
  padding: 1.5rem 0;
  width: 80%;
  margin: 2rem auto 0;
  border-radius: 1rem;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Center = styled.div`
  display: flex;
  align-items: center;
`

const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Input = styled.input`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${palette.Gray100};
  padding: 1.2rem;
  font-size: 0.8rem;
  background-color: ${props => (props.$bgc ? palette.Gray400 : 'white')};

  &::placeholder {
    color: ${palette.Gray100};
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`
const Error = styled.div`
  position: absolute;
  bottom: -1.8rem;
  left: 0.5rem;
`

export default Signup
