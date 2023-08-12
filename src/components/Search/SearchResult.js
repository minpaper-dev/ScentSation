import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import ProductListItem from '../Product/ProductListItem'

const SearchResult = () => {
  const brand = [
    {
      id: 0,
      title: '딥디크',
      image: '',
    },
  ]

  const product = [
    {
      id: 0,
      name: '어저구저쩌구',
      image: '',
      rate: 5,
      reviewCount: 12,
    },
  ]

  return (
    <>
      <div>
        {brand.map(item => (
          <SearchItem key={item.id}>
            <BrandImage src={item.image} />
            <CustomFont content={item.title} $marginLf={1} />
          </SearchItem>
        ))}

        {product.map(item => (
          <ProductListItem
            key={item.id}
            name={item.name}
            image={item.image}
            rate={item.rate}
            reviewCount={item.reviewCount}
          />
        ))}
      </div>
    </>
  )
}

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
