import React from 'react'
import { categories } from '../../common/data'
import CustomFont from '../../styles/CustomFont'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import { Link } from 'react-router-dom'

const MainCategories = () => {
  const renderCategory = item => {
    return (
      <CategoryBox key={item.id}>
        <CustomFont size={1.5} content={item.icon} $marginBt={1} />
        <CustomFont weight={800} content={item.title} />
      </CategoryBox>
    )
  }

  return (
    <Link to={'/filter'}>
      <WrapCategoryBox>
        {categories.map(category => renderCategory(category))}
      </WrapCategoryBox>
    </Link>
  )
}

const WrapCategoryBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
`

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.Gray300};
  border-radius: 0.8rem;
  background-color: white;
  padding: 1.2rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

  cursor: pointer;
`

export default MainCategories
