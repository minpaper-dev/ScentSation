import React from 'react'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

const ProductListItem = ({ name, rate, reviewCount, image }) => {
  return (
    <>
      <Link to={`/product/${1}`}>
        <Container>
          <ProductImage src={image} />
          <ProductInfo>
            <CustomFont content={name} />
            <CustomFont content={rate} />
            <CustomFont content={reviewCount} />
          </ProductInfo>
        </Container>
      </Link>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: ${palette.Gray100};
`

const ProductInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

export default ProductListItem
