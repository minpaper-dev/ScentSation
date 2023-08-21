import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import CustomLogo from '../components/Custom/CustomLogo'
import { genderList } from '../common/data'
import useFirestore from '../hooks/useFirestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {
  const { addData, getDataAll } = useFirestore()
  const auth = getAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { oauth = '', uid = '', nickname = '', email = '' } = state || {}

  const [profileImage, setProfiletImage] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState('')

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
      placeholder: '비밀번호를 입력해주세요',
      hidden: oauth ? true : false,
    },
    passwordCheck: {
      type: 'password',
      title: '비밀번호 확인',
      value: '',
      placeholder: '',
      hidden: oauth ? true : false,
    },
    age: { type: 'text', title: '나이', value: '', placeholder: '' },
    category: {
      type: 'text',
      title: '대표 향료',
      value: '',
      placeholder: '',
    },
    perfume: { type: 'text', title: '대표 향수', value: '', placeholder: '' },
  })

  const [errorMsg, setErrorMsg] = useState({
    nickname: '',
    email: '',
    password: '',
    age: '',
  })

  const [userInfo, setUserInfo] = useState({
    nickname: [],
    email: [],
  })

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    let copyErrorMsg = { ...errorMsg }

    // 닉네임 유효성 검사
    if (userInfo.nickname.includes(inputInfo.nickname.value)) {
      copyErrorMsg = {
        ...copyErrorMsg,
        nickname: '이미 존재하는 닉네임입니다.',
      }
    } else {
      copyErrorMsg = { ...copyErrorMsg, nickname: '' }
    }

    // 이메일 유효성 검사
    if (userInfo.email.includes(inputInfo.email.value)) {
      copyErrorMsg = { ...copyErrorMsg, email: '이미 존재하는 이메일입니다.' }
    } else {
      copyErrorMsg = { ...copyErrorMsg, email: '' }
    }

    setErrorMsg(copyErrorMsg)
  }, [inputInfo])

  const getUserInfo = async () => {
    let info = { nickname: [], email: [] }
    const data = await getDataAll('user')
    data.forEach(
      doc =>
        (info = {
          ...info,
          nickname: [...info.nickname, doc.nickname],
          email: [...info.email, doc.email],
        })
    )
    setUserInfo(info)
  }

  const renderInput = (item, category, index) => {
    if (item.type === 'radio') {
      return (
        <Flex>
          {genderList.map((gender, index) => (
            <Label
              key={gender.title}
              $isActive={inputInfo.gender.value === gender.value}
              style={{ marginLeft: index ? 10 : 0 }}
            >
              <Radio
                type={'radio'}
                name={category}
                value={gender.value}
                onChange={e => onChange(e.target.value, category)}
              />
              <CustomFont
                color={
                  inputInfo.gender.value === gender.value
                    ? 'white'
                    : palette.Gray100
                }
                content={gender.title}
                size={0.8}
              />
            </Label>
          ))}
        </Flex>
      )
    } else {
      return (
        <FlexCol>
          <Input
            $bgc={item.readOnly}
            type={item.type}
            placeholder={item.placeholder}
            onChange={e =>
              onChange(e.target.value, Object.keys(inputInfo)[index])
            }
            readOnly={item.readOnly}
            value={item.value}
          />
          <CustomFont
            content={errorMsg[Object.keys(inputInfo)[index]]}
            size={0.8}
            $marginTop={1}
            color={palette.Red200}
          />
        </FlexCol>
      )
    }
  }

  const onSignup = async () => {
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
        major: inputInfo.perfume.value,
      })

      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e, category) => {
    setInputInfo({
      ...inputInfo,
      [category]: { ...inputInfo[category], value: e },
    })
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setProfiletImage(file)
      const imageUrl = URL.createObjectURL(file)
      setProfileImageUrl(imageUrl)
    }
  }

  const handleUpload = () => {
    const storage = getStorage()
    const storageRef = ref(storage, 'image/image1.jpg')
    if (profileImage) {
      uploadBytesResumable(storageRef, profileImage)
    }
  }

  return (
    <Container>
      <Wrap>
        <CustomLogo $marginTop={5} />
        <ProfileImage src={profileImageUrl} />
        <label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        <button onClick={handleUpload}>클릭</button>

        <FormGrid>
          {Object.values(inputInfo).map(
            (item, index) =>
              // Google 회원가입일 경우 비밀번호, 비밀번호 확인 보여지지 않도록 설정
              !item.hidden && (
                <React.Fragment key={item.title}>
                  <Center>
                    <CustomFont
                      color={palette.Brown500}
                      weight={400}
                      content={item.title}
                      size={0.8}
                    />
                  </Center>
                  {renderInput(item, Object.keys(inputInfo)[index], index)}
                </React.Fragment>
              )
          )}
        </FormGrid>
      </Wrap>
      <SignupButton onClick={onSignup}>
        <CustomFont size={0.8} content={'회원가입'} />
      </SignupButton>
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
`

const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 1fr;
  padding: 0px 3rem;
  row-gap: 1rem;
`

const SignupButton = styled.button`
  margin: 50px 0px;
  background-color: ${palette.Brown100};
  width: 80%;
  padding: 1rem 0px;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.$isActive ? palette.Brown200 : 'white')};
  border: 1px solid ${palette.Gray100};
  border-radius: 0.5rem;
  padding: 0.8rem 0px;

  cursor: pointer;
`

const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const Center = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${palette.Gray100};
  padding: 0.8rem 1rem;
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

const Radio = styled.input`
  display: none;
`

const ProfileImage = styled.img`
  border: 1px solid black;
  width: 10rem;
  height: 10rem;
  margin: 2rem 0px;
  border-radius: 100%;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export default Signup
