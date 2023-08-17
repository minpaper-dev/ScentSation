import React, { useState } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/Custom/CustomInput'
import CustomLogo from '../components/Custom/CustomLogo'
import CustomFont from '../styles/CustomFont'
import useFirestore from '../hooks/useFirestore'

import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

const Login = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { getDataOne } = useFirestore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  })

  const onLoginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)

      let errorMsg = { email: '', password: '' }

      if (JSON.stringify(error).includes('missing-password')) {
        errorMsg = { ...errorMsg, password: '비밀번호를 입력해주세요.' }
      } else if (JSON.stringify(error).includes('invalid-email')) {
        errorMsg = { ...errorMsg, email: '올바른 이메일을 입력해주세요.' }
      } else if (JSON.stringify(error).includes('wrong-password')) {
        errorMsg = { ...errorMsg, password: '비밀번호가 올바르지 않습니다.' }
      } else if (JSON.stringify(error).includes('user-not-found')) {
        errorMsg = { ...errorMsg, email: '일치하는 계정이 존재하지 않습니다.' }
      }
      setErrorMessage(errorMsg)
    }
  }

  const onLoginGoogle = async () => {
    try {
      // Popup창을 띄워 구글 로그인
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      // user DB에 해당 메일이 존재하는 지 검증.uid))
      const result = await getDataOne('user', user.uid)
      console.log(result)

      if (result.exists()) {
        localStorage.setItem('uid', JSON.stringify(user.uid))
        navigate('/', { replace: true })
      } else {
        navigate('/signup', {
          state: {
            oauth: 'google',
            uid: user.uid,
            nickname: user.displayName,
            email: user.email,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Wrap>
        <CustomLogo $marginTop={3} $marginBt={3} />
        <InputContainer>
          <CustomInput value={email} setValue={setEmail} placeholder="E-mail" />
          <ErrorMessage>
            <CustomFont
              size={0.8}
              color={palette.Red100}
              content={errorMessage.email}
            />
          </ErrorMessage>
        </InputContainer>
        <InputContainer>
          <CustomInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Password"
          />
          <ErrorMessage>
            <CustomFont
              size={0.8}
              color={palette.Red100}
              content={errorMessage.password}
            />
          </ErrorMessage>
        </InputContainer>

        <LoginButton
          onClick={onLoginEmail}
          bgc={palette.Brown100}
          $marginTop={2}
        >
          <CustomFont size={0.8} content={'로그인'} />
        </LoginButton>
        <LoginButton onClick={onLoginGoogle} $marginTop={1}>
          <CustomFont size={0.8} content={'Google로 로그인'} />
        </LoginButton>
      </Wrap>

      <Link to={'/signup'}>
        <SignUpButton>회원가입</SignUpButton>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const LoginButton = styled.button`
  background-color: ${props => (props.bgc ? props.bgc : 'white')};
  padding: 15px 0px;
  border-radius: 8px;
  border: 0px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin-top: ${props => `${props.$marginTop}rem`};
  width: 60%;

  cursor: pointer;
`

const SignUpButton = styled.button`
  margin-bottom: 2rem;
  font-weight: 600;
  text-decoration: underline;
  color: ${palette.Brown500};
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputContainer = styled.div`
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -1.4rem;
`

export default Login
