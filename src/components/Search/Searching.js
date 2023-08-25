import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'

const Searching = ({ onClickItem, filterProducts }) => {
  return (
    <>
      <Container>
        {/* {filterProducts.brand.map(item => (
          <SearchItem key={item.id} onClick={() => onClickItem(item)}>
            {item.brand}
          </SearchItem>
        ))} */}
        {filterProducts?.name?.map(item => (
          <SearchItem key={item.id} onClick={() => onClickItem(item.name)}>
            <CustomFont size={1.2} content={item.name} />
          </SearchItem>
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
  padding: 1.5rem 3rem;
`

export default Searching
