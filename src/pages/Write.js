import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { Rate } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
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
    tag: [],
    description: '',
  })

  const onChangeRadio = e => {
    let copy = reviewInfo
    copy = { ...copy, [e.target.name]: e.target.value }
    setReviewInfo(copy)
  }

  const postReview = async () => {
    onPostReview.mutate()
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
            allowHalf
          />
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
                checked={true}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.gender === item.value}
              />
            ))}
          </WrapRadio>
          <CustomFont size={1.2} weight={500} content={'어울리는 계절'} />
          <WrapRadio>
            {REVIEW_FORM.season.map(item => (
              <CustomRadio
                key={item.value}
                name={'season'}
                value={item.value}
                checked={true}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.season === item.value}
              />
            ))}
          </WrapRadio>
          <CustomFont size={1.2} weight={500} content={'지속력'} />
          <WrapRadio>
            {REVIEW_FORM.vitality.map(item => (
              <CustomRadio
                key={item.value}
                name={'vitality'}
                value={item.value}
                checked={true}
                content={item.content}
                onChange={onChangeRadio}
                $isActive={reviewInfo.vitality === item.value}
              />
            ))}
          </WrapRadio>
          <CustomFont size={1.2} weight={500} content={'상세리뷰'} />
          <Input
            name="description"
            value={reviewInfo.description}
            onChange={onChangeRadio}
          />
        </Form>
        <SubmitButton onClick={postReview}>
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

// const Rate = styled.input``

const WrapRadio = styled.div`
  margin: 1rem 0 2rem;
`

const Input = styled.textarea`
  width: 100%;
  height: 8rem;
  border-radius: 1rem;
  margin: 1rem 0 2rem;
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
