import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import closeIcon from '../../assets/icon_close.png'
import { SEARCH_HISTORY } from '../../common/localstorage'
import { SearchInterface } from '../../pages/Search'

interface SearchPending {
  onClickItem: (value: string) => void
  findProduct: (value: string) => void
}

const SearchPending: React.FC<SearchPending> = ({
  onClickItem,
  findProduct,
}) => {
  const [data, setData] = useState<SearchInterface[]>([])

  useEffect(() => {
    let searchData =
      JSON.parse(localStorage.getItem(SEARCH_HISTORY) || 'null') || [].reverse()

    setData(searchData)
  }, [])

  const deleteSearch = (id: string) => {
    let filterData = data.filter(v => v.id !== id)
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(filterData))
    setData(filterData)
  }

  return (
    <>
      <div>
        {data.map(item => (
          <SearchItem key={item.id}>
            <SearchButton
              onClick={() => {
                findProduct(item.text)
                onClickItem(item.text)
              }}
              key={item.index}
            >
              <CustomFont size={1.2} content={item.text} />
              <CustomFont content={item.date} $marginRi={0.5} />
            </SearchButton>

            <DeleteButton onClick={() => deleteSearch(item.id)}>
              <Icon src={closeIcon} />
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

const Icon = styled.img`
  width: 2rem;
`

export default SearchPending
