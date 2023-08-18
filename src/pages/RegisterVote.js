import React from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import Header from '../components/Header'
import CustomFont from '../styles/CustomFont'
import { useNavigate } from 'react-router-dom'

const RegisterVote = () => {
  const navigate = useNavigate()

  const selectPerfume = () => {
    navigate('/select')
  }

  return (
    <>
      <Header pageName={'투표 등록'} />
      <Container>
        <FlexRowBetween>
          <SelectPerfume onClick={selectPerfume}>
            <CustomFont content={'향수를 선택해주세요'} />
          </SelectPerfume>
          <SelectPerfume>
            <CustomFont content={'향수를 선택해주세요'} />
          </SelectPerfume>
        </FlexRowBetween>

        <Form>
          <Label htmlFor="description">
            <CustomFont content={'어떤 점이 고민되시나요?'} />
          </Label>
          <TextArea id="description"></TextArea>
        </Form>
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  padding: 3rem;
`

const FlexRowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectPerfume = styled.div`
  border: 1px solid black;
  width: 45%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  background-color: ${palette.Gray300};
`

const Form = styled.form``

const Label = styled.label`
  display: block;
  margin: 2rem 0 1rem;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 8rem;
  border-radius: 1rem;
  resize: none;
  border: 1px solid ${palette.Brown100};
  padding: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown200};
  }
`

export default RegisterVote
