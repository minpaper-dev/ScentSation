import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import ProductListItem from '../Product/ProductListItem'

const SearchResult = ({ filterProducts, isSelect }) => {
  return (
    <>
      <Container>
        {/* {brand.map(item => (
          <SearchItem key={item.id}>
            <BrandImage src={item.image} />
            <CustomFont content={item.title} $marginLf={1} />
          </SearchItem>
        ))} */}

        {filterProducts.name.map(item => (
          <ProductListItem key={item.id} item={item} isSelect={isSelect} />
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  padding-bottom: 10rem;
`

const SearchItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

const BrandImage = styled.img`
  width: 5rem;
  height: 2.5rem;
  background-color: ${palette.Gray100};
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

export default SearchResult
