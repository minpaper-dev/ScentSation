import React from 'react'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

const ProductListItem = ({ item }) => {
  return (
    <>
      <Link to={`/product/${item.id}`}>
        <Container>
          <ProductImage src={item.image} />
          <ProductInfo>
            <CustomFont content={item.brand} />
            <CustomFont content={item.name} />
            <CustomFont content={`${item.size}ml`} />
            <CustomFont content={`${item.price}원`} />
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
