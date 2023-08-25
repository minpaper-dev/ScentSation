import React, { useState } from 'react'
import { styled } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from 'react-query'

import Header from '../components/Header'
import Searching from '../components/Search/Searching'
import SearchResult from '../components/Search/SearchResult'
import SearchPending from '../components/Search/SearchPending'
import useFirestore from '../hooks/useFirestore'
import { SEARCH_HISTORY } from '../common/localstorage'

const Search = () => {
  const { getDataAll } = useFirestore()

  const { data: productData } = useQuery({
    queryKey: 'product',
    queryFn: () => getDataAll('product'),
    initialData: [],
  })

  const { data: brandData } = useQuery({
    queryKey: 'brand',
    queryFn: () => getDataAll('brand'),
    initialData: [],
  })

  // 0 : 검색 전, 1 : 검색 중, 2 : 검색 결과
  const [inputState, setInputState] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const [filterProducts, setFilterProducts] = useState([])

  const findProduct = text => {
    const name = productData.filter(v => v.name.includes(text))
    const brand = brandData.filter(v => v.name.includes(text))
    setFilterProducts({ name, brand })
  }

  const onChange = e => {
    setInputValue(e.target.value)
    if (e.target.value.length) setInputState(1)
    else setInputState(0)

    findProduct(e.target.value)
  }

  const onClickItem = value => {
    setInputState(2)
    setInputValue(value)
    recordSearchValue(value)
  }

  const onKeyDownEnter = e => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return
      onClickItem(inputValue)
    }
  }

  const recordSearchValue = text => {
    const date = `${new Date().getFullYear()}.${
      new Date().getMonth() + 1
    }.${new Date().getDate()}`

    const data = { id: uuidv4(), text, date }

    let localSearch = JSON.parse(localStorage.getItem(SEARCH_HISTORY)) || []

    localSearch.map((item, index) => {
      if (item.text === text) {
        localSearch.splice(index, 1)
      }
    })

    localStorage.setItem(
      SEARCH_HISTORY,
      localSearch
        ? JSON.stringify([...localSearch, data])
        : JSON.stringify([data])
    )
  }

  return (
    <Container>
      <Header pageName={'검색'} />
      <WrapInput>
        <Input
          value={inputValue}
          onChange={onChange}
          onKeyDown={e => onKeyDownEnter(e)}
          placeholder="제품명, 브랜드를 입력해보세요 : )"
        />
        <SearchButton onClick={() => onClickItem(inputValue)}>🔍</SearchButton>
      </WrapInput>
      {inputState === 0 ? (
        <SearchPending onClickItem={onClickItem} findProduct={findProduct} />
      ) : inputState === 1 ? (
        <Searching onClickItem={onClickItem} filterProducts={filterProducts} />
      ) : (
        <SearchResult filterProducts={filterProducts} />
      )}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

const WrapInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  border: 1px solid #f5f5f5;
  border-radius: 1.6rem;
  margin: 1rem auto 2rem;
  padding: 0.4rem 1rem;
  color: #a0a0a0;

  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  border: 0px;
  outline: none;
  font-size: 1.2rem;
  &::placeholder {
    font-size: 1.2rem;
  }
`

const SearchButton = styled.div`
  height: 100%;
  font-size: 1.6rem;
  border: 0;
  padding: 1rem;
  cursor: pointer;
`

const WrapComponent = styled.div`
  background-color: white;
  flex: 1;
`

export default Search
