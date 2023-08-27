import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import Header from '../components/Header'
import CustomFont from '../styles/CustomFont'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isSelectModal, myInfoState, myVotePerfumeState } from '../recoil/atoms'
import useFirestore from '../hooks/useFirestore'
import VoteProduct from '../components/Vote/VoteProduct'
import SelectPerfume from '../components/Profile/SelectPerfume'
import CustomModal from '../components/Custom/CustomModal'
import { useNavigate } from 'react-router-dom'

const RegisterVote = () => {
  const navigate = useNavigate()
  const { addData } = useFirestore()

  const [perfume] = useRecoilState(myVotePerfumeState)
  const [myInfo] = useRecoilState(myInfoState)
  const [isSelect, setIsSelect] = useRecoilState(isSelectModal)

  const resetPerfume = useSetRecoilState(myVotePerfumeState)

  const [description, setDescription] = useState('')
  const [isCompleteModal, setIsCompleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    perfume: { state: false, message: '' },
    description: { state: false, message: '' },
  })

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  const reset = () => {
    resetPerfume([])
  }

  const emptyBox = () => {
    return (
      <SelectPerfumeBox onClick={() => setIsSelect(true)}>
        <CustomFont content={'향수를 선택해주세요'} />
      </SelectPerfumeBox>
    )
  }

  const onModalHandler = () => {
    setIsCompleteModal(true)
    setTimeout(() => {
      setIsCompleteModal(false)
      navigate(-1)
      reset()
    }, 1500)
  }

  const postVote = async () => {
    await addData('vote', '', {
      description: description,
      perfume: perfume,
      userInfo: myInfo,
      commentCount: 0,
    })
    onModalHandler()
  }

  const onClickBtn = () => {
    if (perfume.length < 2 || !description) {
      checkError()
      return
    } else {
      postVote()
    }
  }

  const checkError = () => {
    let copyError = { ...errorMessage }
    if (perfume.length < 2) {
      copyError = {
        ...copyError,
        perfume: { state: true, message: '향수를 2개 선택해주세요' },
      }
    }
    if (!description) {
      copyError = {
        ...copyError,
        description: { state: true, message: '내용을 입력해주세요' },
      }
    }

    setErrorMessage(copyError)
  }

  return (
    <>
      <Header pageName={'투표 등록'} />
      <Container>
        <Flex>
          <CustomFont
            size={1.2}
            weight={800}
            content={'향수를 선택해주세요 !'}
            $marginBt={2}
          />

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
          <CustomFont
            color={palette.Red200}
            content={errorMessage.perfume.message}
            weight={600}
          />
          <Form>
            <Label htmlFor="description">
              <CustomFont
                size={1.2}
                weight={800}
                content={'어떤 점이 고민되시나요?'}
              />
            </Label>
            <TextArea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <CustomFont
              color={palette.Red200}
              content={errorMessage.description.message}
              weight={600}
              $marginTop={1}
            />
          </Form>
        </Flex>
        <Button onClick={onClickBtn}>
          <CustomFont size={1.4} weight={800} content={'투표 올리기'} />
        </Button>
        {isCompleteModal && (
          <CustomModal content={'투표 작성이 완료되었습니다.'} />
        )}
        {isSelect && <SelectPerfume />}
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
  padding-bottom: 10rem;
`

const FlexRowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
`

const SelectPerfumeBox = styled.div`
  width: 45%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  background-color: ${palette.Gray300};
  border: 1px solid ${palette.Gray400};
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
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown200};
  }
`

const Product = styled.div`
  width: 45%;
  height: 8rem;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid ${palette.Gray400};
`

const Button = styled.button`
  display: block;
  background-color: ${palette.Brown100};
  padding: 2rem 0;
  width: 100%;
  margin: 0 auto;
  border-radius: 1rem;
`

const Flex = styled.div``

export default RegisterVote
