import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

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
            <CustomFont size={0.8} content={item.name} />
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

  &:hover,
  &:focus,
  &:active {
    outline: none;
    background-color: ${palette.Gray300};
    opacity: 0.9;
  }
`

export default Searching
