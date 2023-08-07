import React from 'react'
import { categories } from '../../common/data'
import CustomFont from '../../styles/CustomFont'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'

const MainCategories = () => {
  const renderCategory = item => {
    return (
      <CategoryBox>
        <CustomFont size={25} content={item.icon} marginBt={10} />
        <CustomFont size={12} content={item.title} />
      </CategoryBox>
    )
  }

  return (
    <WrapCategoryBox>
      {categories.map(category => renderCategory(category))}
    </WrapCategoryBox>
  )
}

const WrapCategoryBox = styled.div`
  min-width: 380px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 25px;
`

const CategoryBox = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.Gray300};
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`

export default MainCategories
