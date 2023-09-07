import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Rate } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { useRecoilState } from 'recoil'

import { myInfoState } from '../recoil/atoms'
import { REVIEW_FORM } from '../common/data'
import Header from '../components/Header'
import CustomModal from '../components/Custom/CustomModal'
import CustomRadio from '../components/Custom/CustomRadio'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'

const Write = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { productInfo } = state
  const queryClient = useQueryClient()

  const { addData } = useFirestore()
  const [myInfo] = useRecoilState(myInfoState)

  const onPostReview = useMutation(
    () =>
      addData('review', '', {
        ...reviewInfo,
        product: productInfo,
        user: myInfo,
        rate: rate,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['review', productInfo.id] })
      },
      onError: error => {
        console.log(`Delete Todo Error ${error}`)
      },
    }
  )

  const [isModal, setIsModal] = useState(false)
  const [rate, setRate] = useState(0)
  const [reviewInfo, setReviewInfo] = useState({
    gender: '',
    season: '',
    vitality: '',
    description: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    rate: { state: false, message: '' },
    gender: { state: false, message: '' },
    season: { state: false, message: '' },
    vitality: { state: false, message: '' },
    description: { state: false, message: '' },
  })

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy = { ...reviewInfo, [e.target.name]: e.target.value }
    setReviewInfo(copy)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = { ...reviewInfo, description: e.target.value }
    setReviewInfo(copy)
  }

  const onClickBtn = () => {
    if (!rate || Object.values(reviewInfo).includes('')) {
      checkError()
      return
    } else {
      onPostReview.mutate()
      onModalHandler()
    }
  }

  const checkError = () => {
    let copyError = { ...errorMessage }
    if (!rate)
      copyError = {
        ...copyError,
        rate: { state: true, message: '별점을 입력해주세요' },
      }
    if (!reviewInfo.gender)
      copyError = {
        ...copyError,
        gender: { state: true, message: '성별을 입력해주세요' },
      }
    if (!reviewInfo.season)
      copyError = {
        ...copyError,
        season: { state: true, message: '계절을 입력해주세요' },
      }
    if (!reviewInfo.vitality)
      copyError = {
        ...copyError,
        vitality: { state: true, message: '지속력을 입력해주세요' },
      }
    if (!reviewInfo.description)
      copyError = {
        ...copyError,
        description: { state: true, message: '내용을 입력해주세요' },
      }

    setErrorMessage(copyError)
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
      <Header pageName={'리뷰 작성'} />
      <Container>
        <Product>
          <ProductImage src={productInfo.image} />

          <CustomFont size={1.4} content={productInfo.brand} $marginBt={1} />
          <CustomFont size={1.8} weight={800} content={productInfo.name} />
        </Product>
        <Form>
          <Rate
            character={<StarFilled style={{ fontSize: '5rem' }} />}
            value={rate}
            onChange={value => setRate(value)}
          />
          {errorMessage.rate.state && (
            <CustomFont
              color={palette.Red200}
              content={errorMessage.rate.message}
              weight={600}
              $marginTop={1}
            />
          )}
          <CustomFont
            size={1.2}
            weight={500}
            content={'어울리는 성별'}
            $marginTop={2}
          />
          <WrapRadio>
            {REVIEW_FORM.gender.map(item => (
              <CustomRadio
                key={item.value}
                name={'gender'}
                value={item.value}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.gender === item.value}
              />
            ))}
          </WrapRadio>
          {errorMessage.gender.state && (
            <CustomFont
              color={palette.Red200}
              content={errorMessage.gender.message}
              weight={600}
              $marginTop={1}
            />
          )}

          <CustomFont
            size={1.2}
            weight={500}
            content={'어울리는 계절'}
            $marginTop={2}
          />
          <WrapRadio>
            {REVIEW_FORM.season.map(item => (
              <CustomRadio
                key={item.value}
                name={'season'}
                value={item.value}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.season === item.value}
              />
            ))}
          </WrapRadio>
          {errorMessage.season.state && (
            <CustomFont
              color={palette.Red200}
              content={errorMessage.season.message}
              weight={600}
              $marginTop={1}
            />
          )}
          <CustomFont
            size={1.2}
            weight={500}
            content={'지속력'}
            $marginTop={2}
          />
          <WrapRadio>
            {REVIEW_FORM.vitality.map(item => (
              <CustomRadio
                key={item.value}
                name={'vitality'}
                value={item.value}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.vitality === item.value}
              />
            ))}
          </WrapRadio>
          {errorMessage.vitality.state && (
            <CustomFont
              color={palette.Red200}
              content={errorMessage.vitality.message}
              weight={600}
              $marginTop={1}
            />
          )}
          <CustomFont
            size={1.2}
            weight={500}
            content={'상세리뷰'}
            $marginTop={2}
          />
          <Input
            name="description"
            value={reviewInfo.description}
            onChange={onChange}
          />
          {errorMessage.description.state && (
            <CustomFont
              color={palette.Red200}
              content={errorMessage.description.message}
              weight={600}
              $marginTop={1}
            />
          )}
        </Form>
        <SubmitButton onClick={onClickBtn}>
          <CustomFont size={1.4} weight={800} content={'리뷰쓰기'} />
        </SubmitButton>
        {isModal && (
          <CustomModal content={'리뷰를 작성해주셔서 감사합니다 : )'} />
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  padding-bottom: 10rem;
`

const Product = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`

const ProductImage = styled.img`
  display: block;
  width: 60%;
  height: 60%;
  margin: 0 auto 2rem;
  background-color: white;
`
const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`

const WrapRadio = styled.div`
  margin: 1rem 0 0;
`

const Input = styled.textarea`
  width: 100%;
  height: 8rem;
  border-radius: 1rem;
  margin: 1rem 0 0;
  padding: 1.5rem;
  resize: none;
  font-size: 1.2rem;
  border: 1px solid ${palette.Brown100};

  &:focus {
    outline: none;
    border: 1px solid ${palette.Brown200};
  }
`

const SubmitButton = styled.button`
  display: block;
  background-color: ${palette.Brown100};
  padding: 2rem 0;
  width: 90%;
  margin: 0 auto;
  border-radius: 1rem;
`

export default Write
