import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import ProfileItem from '../Profile/ProfileItem'
import CustomTags from '../../styles/CustomTags'

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
      <ProfileItem />
      <TagList>
        <CustomTags />
        <CustomTags />
      </TagList>
      <CustomFont
        content={
          '리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...'
        }
        marginBt={15}
      />
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

const TagList = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px;
`

export default ReviewItemWithProduct
