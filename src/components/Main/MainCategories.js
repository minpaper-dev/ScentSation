import React from 'react'
import { categories } from '../../common/data'
import CustomFont from '../../styles/CustomFont'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import { Link } from 'react-router-dom'

const MainCategories = () => {
  const renderCategory = item => {
    return (
      <Link to={`/filter`} state={{ category: item.title }} key={item.title}>
        <CategoryBox>
          <CustomFont size={2} content={item.icon} $marginBt={1} />
          <CustomFont size={1.4} weight={400} content={item.title} />
        </CategoryBox>
      </Link>
    )
  }

  return (
    <WrapCategoryBox>
      {categories.map(category => renderCategory(category))}
    </WrapCategoryBox>
  )
}

const WrapCategoryBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
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

  &:hover {
    /* opacity: 0.5; */
    transform: scale(1.15);
  }

  cursor: pointer;
`

export default MainCategories
