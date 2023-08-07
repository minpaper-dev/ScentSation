import React, { useState } from 'react'
import { styled } from 'styled-components'

import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import { genderList } from '../common/data'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore/lite'
import { db } from '../Firebase'

const Signup = () => {
  const auth = getAuth()

  const [inputInfo, setInputInfo] = useState({
    gender: { type: 'radio', title: '성별', value: '', placeholder: '' },
    nickname: {
      type: 'text',
      title: '닉네임',
      value: '',
      placeholder: '닉네임을 입력해주세요.',
    },
    email: {
      type: 'text',
      title: 'E-mail',
      value: '',
      placeholder: 'E-mail을 입력해주세요.',
    },
    password: {
      type: 'password',
      title: '비밀번호',
      value: '',
      placeholder: '비밀번호를 입력해주세요',
    },
    passwordCheck: {
      type: 'password',
      title: '비밀번호 확인',
      value: '',
      placeholder: '',
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

  const renderRadio = category => {
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
                inputInfo.gender.value === gender.value ? 'white' : 'black'
              }
              content={gender.title}
            />
          </Label>
        ))}
      </Flex>
    )
  }

  const onSignup = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        inputInfo.email.value,
        inputInfo.password.value
      )
      console.log(user.uid)
      await setDoc(doc(db, 'user', user.uid), {
        // auth : email,
        email: inputInfo.email.value,
        nickname: inputInfo.nickname.value,
        password: inputInfo.password.value,
        age: inputInfo.age.value,
        gender: inputInfo.gender.value,
        category: inputInfo.category.value,
        major: inputInfo.perfume.value,
      })
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

  return (
    <Container>
      <Wrap>
        <Logo>ScentSation</Logo>
        <ProfileImage />
        <FormGrid>
          {Object.values(inputInfo).map((item, index) => (
            <React.Fragment key={item.title}>
              <Center>
                <CustomFont content={item.title} />
              </Center>
              {item.type === 'radio' ? (
                renderRadio(Object.keys(inputInfo)[index])
              ) : (
                <Input
                  type={item.type}
                  placeholder={item.placeholder}
                  onChange={e =>
                    onChange(e.target.value, Object.keys(inputInfo)[index])
                  }
                  value={item.value}
                />
              )}
            </React.Fragment>
          ))}
        </FormGrid>
      </Wrap>
      <SignupButton onClick={onSignup}>회원가입</SignupButton>
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

const Logo = styled.div`
  color: ${palette.Brown100};
  font-weight: 700;
  font-size: 2rem;
`

const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 1fr;
  padding: 0px 3rem;
  row-gap: 1.5rem;
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
  border: 1px solid ${palette.Brown200};
  border-radius: 0.5rem;
  padding: 1rem 0px;

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
  border-radius: 8px;
  border: 1px solid ${palette.Brown200};
  padding: 15px 18px;

  &::placeholder {
    color: ${palette.Gray200};
  }

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`

const Radio = styled.input`
  display: none;
`

const ProfileImage = styled.button`
  border: 1px solid black;
  width: 10rem;
  height: 10rem;
  margin: 2rem 0px;
  border-radius: 100%;
`

export default Signup
