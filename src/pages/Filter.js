import React from 'react'
import CustomFont from '../styles/CustomFont'
import CustomTags from '../styles/CustomTags'
import { styled } from 'styled-components'
import { FILTER_CATEGORY } from '../common/data'
import palette from '../styles/CustomColor'
import ProductListItem from '../components/Product/ProductListItem'

const Filter = () => {
  const product = [
    {
      id: 0,
      name: '어저구저쩌구',
      image: '',
      rate: 5,
      reviewCount: 12,
    },
    {
      id: 1,
      name: '어저구저쩌구',
      image: '',
      rate: 5,
      reviewCount: 12,
    },
  ]

  return (
    <Container>
      <WrapTags>
        {FILTER_CATEGORY.map((item, index) => (
          <CustomTags
            key={item}
            content={item}
            bgc={index ? palette.Brown200 : palette.Brown500}
            $marginRi={1}
          />
        ))}
      </WrapTags>

      <Sort>
        <CustomFont content={'리뷰 많은 순'} size={0.8} />
      </Sort>

      {product.map(item => (
        <ProductListItem
          key={item.id}
          name={item.name}
          image={item.image}
          rate={item.rate}
          reviewCount={item.reviewCount}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

const WrapTags = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
`

const Sort = styled.div`
  margin: 2rem 1rem 1rem;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  /* border: 1px solid ${palette.Gray400}; */
`

export default Filter
