import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import ReviewItem from './ReviewItem'

const ReviewItemWithProduct = () => {
  return (
    <Container>
      <Product>
        <ProductImage />
        <ProductInfo>
          <CustomFont content={'르라보'} />
          <CustomFont content={'어나더 13'} />
        </ProductInfo>
      </Product>
      <ReviewItem />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Product = styled.div`
  display: flex;
  align-items: center;
  background-color: ${palette.Gray300};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 19px;
`

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  background-color: ${palette.Gray100};
  margin-right: 15px;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ReviewItemWithProduct
