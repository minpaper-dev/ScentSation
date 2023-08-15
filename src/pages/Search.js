import React, { useState } from 'react'
import { styled } from 'styled-components'
import Searching from '../components/Search/Searching'
import SearchResult from '../components/Search/SearchResult'
import Header from '../components/Header'
import SearchPending from '../components/Search/SearchPending'

const Search = () => {
  const [inputState, setInputState] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const onChange = e => {
    setInputValue(e.target.value)
    if (e.target.value.length) setInputState(1)
    else setInputState(0)
  }

  const onClickItem = value => {
    setInputValue(value)
    setInpuStateResult()
  }

  const setInpuStateResult = () => {
    setInputState(2)
  }

  return (
    <Container>
      <Header pageName={'검색'} />
      <WrapInput>
        <Input
          value={inputValue}
          onChange={onChange}
          placeholder="제품명, 브랜드를 입력해보세요 : )"
        ></Input>
        <SearchButton onClick={setInpuStateResult}>🔍</SearchButton>
      </WrapInput>
      {inputState === 0 ? (
        <SearchPending onClickItem={onClickItem} />
      ) : inputState === 1 ? (
        <Searching onClickItem={onClickItem} />
      ) : (
        <SearchResult />
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
