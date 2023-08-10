import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

const SearchPending = () => {
  const data = [
    {
      id: 0,
      content: '검색어1',
      date: '08.10',
    },
    {
      id: 1,
      content: '검색어2',
      date: '08.10',
    },
    {
      id: 2,
      content: '검색어3',
      date: '08.10',
    },
  ]

  return (
    <>
      <div>
        {data.map(item => (
          <SearchItem key={item.id}>
            <CustomFont content={item.content} />
            <CustomFont content={item.date} />
          </SearchItem>
        ))}
      </div>
    </>
  )
}

const SearchItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

export default SearchPending
