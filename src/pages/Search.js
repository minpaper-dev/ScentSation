import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Searching from '../components/Search/Searching'
import SearchResult from '../components/Search/SearchResult'
import Header from '../components/Header'
import SearchPending from '../components/Search/SearchPending'
import useFirestore from '../hooks/useFirestore'
import { v4 as uuidv4 } from 'uuid'
import { useLocation } from 'react-router-dom'

const Search = () => {
  const { getDataAll } = useFirestore()
  const { state } = useLocation()

  const [inputState, setInputState] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const result = await getDataAll('product')
    setProducts(result)
  }

  const findProduct = text => {
    const name = products.filter(v => v.name.includes(text))
    // const brand = products.filter(v => v.brand.includes(text))

    setFilterProducts({ name })
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

    let local = localStorage.getItem('search')

    if (local) {
      localStorage.setItem(
        'search',
        JSON.stringify([...JSON.parse(local), data])
      )
    } else {
      localStorage.setItem('search', JSON.stringify([data]))
    }
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
        <SearchResult
          filterProducts={filterProducts}
          isSelect={state?.isSelect || false}
        />
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
  border-radius: 1rem;
  margin: 1rem auto;
  padding-left: 1rem;
  color: #a0a0a0;

  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  border: 0px;
  outline: none;
`

const SearchButton = styled.div`
  height: 100%;

  border: 0;
  border-radius: 1rem;
  padding: 1rem;

  cursor: pointer;
`

const WrapComponent = styled.div`
  background-color: white;
  flex: 1;
`

export default Search
