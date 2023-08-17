import React from 'react'
import { styled } from 'styled-components'

const Searching = ({ onClickItem, filterProducts }) => {
  return (
    <>
      <div>
        {/* {filterProducts.brand.map(item => (
          <SearchItem key={item.id} onClick={() => onClickItem(item)}>
            {item.brand}
          </SearchItem>
        ))} */}
        {filterProducts.name.map(item => (
          <SearchItem key={item.id} onClick={() => onClickItem(item.name)}>
            {item.name}
          </SearchItem>
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
`

export default Searching
