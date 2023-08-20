import React, { useState } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import Header from '../components/Header'
import CustomFont from '../styles/CustomFont'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { myInfoState, myVotePerfumeState } from '../recoil/atoms'
import useFirestore from '../hooks/useFirestore'
import VoteProduct from '../components/Vote/VoteProduct'

const RegisterVote = () => {
  const navigate = useNavigate()
  const { addData } = useFirestore()

  const [perfume] = useRecoilState(myVotePerfumeState)
  const [myInfo] = useRecoilState(myInfoState)

  const resetPerfume = useSetRecoilState(myVotePerfumeState)

  const [description, setDescription] = useState('')

  const goToSearch = () => {
    navigate('/search', { state: { isSelect: true } })
  }

  const reset = () => {
    resetPerfume([])
  }

  const emptyBox = () => {
    return (
      <SelectPerfume onClick={goToSearch}>
        <CustomFont content={'향수를 선택해주세요'} />
      </SelectPerfume>
    )
  }

  const postVote = async () => {
    await addData('vote', '', {
      description: description,
      perfume: perfume,
      userInfo: myInfo,
    })
  }

  return (
    <>
      <Header pageName={'투표 등록'} />
      <Container>
        <CustomFont size={1.2} weight={800} content={'향수를 선택해주세요 !'} />

        <FlexRowBetween>
          {perfume.length ? (
            <Product>
              <VoteProduct data={perfume[0]} />
            </Product>
          ) : (
            emptyBox()
          )}
          {perfume.length > 1 ? (
            <Product>
              <VoteProduct data={perfume[1]} />
            </Product>
          ) : (
            emptyBox()
          )}
        </FlexRowBetween>
        <Form>
          <Label htmlFor="description">
            <CustomFont content={'어떤 점이 고민되시나요?'} />
          </Label>
          <TextArea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></TextArea>
        </Form>
        <Button onClick={postVote}>
          <CustomFont content={'투표 올리기'} />
        </Button>
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Product = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: 1rem;
  margin-bottom: 19px;
`

const Button = styled.button`
  display: block;
  width: 100%;
  background-color: ${palette.Brown100};
  margin: 0 auto;
  padding: 1rem 0;
  border-radius: 1rem;
  margin-top: 1rem;

  &:hover,
  &:focus,
  &:active {
    background-color: ${palette.Brown200};
  }
`

export default RegisterVote
