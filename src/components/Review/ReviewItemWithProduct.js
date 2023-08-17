import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import ReviewItem from './ReviewItem'

const ReviewItemWithProduct = ({ data, isNoProfile }) => {
  return (
    <>
      <Product>
        <ProductImage src={data.product.image} />
        <ProductInfo>
          <CustomFont content={data.product.brand} />
          <CustomFont content={data.product.name} />
        </ProductInfo>
      </Product>
      <ReviewItem data={data} isNoProfile={isNoProfile} />
    </>
  )
}

const Product = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: 1rem;
  margin-bottom: 19px;
`

const ProductImage = styled.img`
  width: 40%;
  height: auto;
  background-color: white;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ReviewItemWithProduct
