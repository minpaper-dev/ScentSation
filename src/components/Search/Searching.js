import React from 'react'
import { styled } from 'styled-components'

const Searching = ({ onClickItem }) => {
  const data = ['딥티크', '조말론']

  return (
    <>
      <div>
        {data.map(item => (
          <SearchItem key={item} onClick={() => onClickItem(item)}>
            {item}
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
