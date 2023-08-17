import React, { useState } from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'
import CustomRadio from '../components/Custom/CustomRadio'
import { REVIEW_FORM } from '../common/data'
import CustomInput from '../components/Custom/CustomInput'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'

const Write = () => {
  const { state } = useLocation()
  const { addData } = useFirestore()

  const [productInfo, setProductInfo] = useState(state)
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
    await addData('review', '', { ...reviewInfo, product: state, rate: rate })
  }

  return (
    <>
      <Header pageName={'리뷰 작성'} />
      <Container>
        <Product>
          <ProductImage src={productInfo.image} />
          <CustomFont content={productInfo.brand} />
          <CustomFont content={productInfo.name} />
        </Product>
        <Form>
          <Rate
            value={rate}
            onChange={e => setRate(e.target.value)}
            type="number"
          />
          <CustomFont content={'어울리는 성별'} />
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
          <CustomFont content={'어울리는 계절'} />
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
          <CustomFont content={'지속력'} />
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
          <CustomFont content={'상세리뷰'} />
          <Input />
        </Form>
        <SubmitButton onClick={postReview}>리뷰쓰기</SubmitButton>
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

const Product = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`

const ProductImage = styled.img`
  width: 100%;
  padding: 3rem;
`
const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
`

const Rate = styled.input``

const WrapRadio = styled.div`
  margin: 1rem 0 2rem;
`

const Input = styled.textarea`
  width: 100%;
  height: 8rem;
  border-radius: 1rem;
  margin: 1rem 0 2rem;
  padding: 1rem;
  resize: none;
  font-size: 1rem;
  border: 1px solid ${palette.Brown100};

  &:focus {
    outline: none;
    border: 1px solid ${palette.Brown200};
  }
`

const SubmitButton = styled.button`
  background-color: ${palette.Brown200};
  padding: 2rem;
  width: 100%;
`
export default Write
