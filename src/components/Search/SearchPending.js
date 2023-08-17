import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

const SearchPending = ({ onClickItem, findProduct }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    let searchData = JSON.parse(localStorage.getItem('search')) || []
    setData(searchData)
  }, [])

  const deleteSearch = id => {
    let filterData = data.filter(v => v.id !== id)
    localStorage.setItem('search', JSON.stringify(filterData))
    setData(filterData)
  }

  return (
    <>
      <div>
        {data.reverse().map((item, index) => (
          <SearchItem key={item.id}>
            <SearchButton
              onClick={() => {
                findProduct(item.text)
                onClickItem(item.text)
              }}
              key={item.index}
            >
              <CustomFont size={0.8} content={item.text} />
              <CustomFont size={0.8} content={item.date} $marginRi={0.5} />
            </SearchButton>

            <DeleteButton onClick={() => deleteSearch(item.id)}>
              <CustomFont size={0.6} content={'X'} />
            </DeleteButton>
          </SearchItem>
        ))}
      </div>
    </>
  )
}

const SearchItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

const SearchButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`

export default SearchPending
