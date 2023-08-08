import React, { useState } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/Custom/CustomInput'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      console.log(user.accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Wrap>
        <Logo>ScentSation</Logo>
        <CustomInput value={email} setValue={setEmail} placeholder="E-mail" />
        <CustomInput
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
        />

        <LoginButton onClick={onLogin} bgc={palette.Brown100}>
          로그인
        </LoginButton>
        <LoginButton>Google로 로그인</LoginButton>
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

const Logo = styled.div`
  color: ${palette.Brown100};
  font-weight: 700;
  font-size: 2rem;
`

const LoginButton = styled.button`
  background-color: ${props => (props.bgc ? props.bgc : 'white')};
  padding: 15px 0px;
  border-radius: 8px;
  border: 0px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
  width: 65%;

  cursor: pointer;
`

const SignUpButton = styled.button`
  margin-bottom: 100px;
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

export default Login
