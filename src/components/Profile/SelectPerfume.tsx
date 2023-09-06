import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useQuery } from '@tanstack/react-query'

import SearchPending from '../Search/SearchPending'
import Searching from '../Search/Searching'
import SearchResult from '../Search/SearchResult'
import useFirestore from '../../hooks/useFirestore'
import { PerfumeInterface } from '../../pages/Main'
import { FilterProductInterface } from '../../pages/Search'

const SelectPerfume = () => {
  const { getDataAll } = useFirestore()

  const { data: productData } = useQuery<PerfumeInterface[] | undefined>(
    ['product'],
    () => getDataAll<PerfumeInterface[]>('product')
  )

  const [inputState, setInputState] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const [filterProducts, setFilterProducts] = useState<FilterProductInterface>({
    name: [],
  })

  const findProduct = (text: string) => {
    if (!productData) return

    const name = productData.filter(v =>
      v.name.replace(/\s+/g, '').includes(text)
    )

    setFilterProducts({ name })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value.length) setInputState(1)
    else setInputState(0)

    findProduct(e.target.value)
  }

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return

      onClickItem(inputValue)
    }
  }

  const onClickItem = (value: string) => {
    setInputState(2)
    setInputValue(value)
  }

  return (
    <ModalBackdrop>
      <ModalView onClick={e => e.stopPropagation()}>
        <WrapInput>
          <Input
            value={inputValue}
            onChange={onChange}
            onKeyDown={e => onKeyDownEnter(e)}
            placeholder="제품명, 브랜드를 입력해보세요 : )"
          />
          <SearchButton onClick={() => onClickItem(inputValue)}>
            🔍
          </SearchButton>
        </WrapInput>
        {inputState === 0 ? (
          <SearchPending onClickItem={onClickItem} findProduct={findProduct} />
        ) : inputState === 1 ? (
          <Searching
            onClickItem={onClickItem}
            filterProducts={filterProducts}
          />
        ) : (
          <SearchResult filterProducts={filterProducts} isSelect={true} />
        )}
      </ModalView>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;
  width: 80%;
  max-width: 40rem;
  height: 60vh;
  background-color: white;
  padding: 2rem 0;
  overflow: auto;
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

export default SelectPerfume
