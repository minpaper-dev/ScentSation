import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'
import ProductListItem from '../Product/ProductListItem'
import useFirestore from '../../hooks/useFirestore'

const SearchResult = () => {
  const [data, setData] = useState([])

  const { getDataAll } = useFirestore()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await getDataAll('product')
    setData(result)
  }
  return (
    <>
      <div>
        {/* {brand.map(item => (
          <SearchItem key={item.id}>
            <BrandImage src={item.image} />
            <CustomFont content={item.title} $marginLf={1} />
          </SearchItem>
        ))} */}

        {data.map(item => (
          <ProductListItem key={item.id} item={item} />
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
  border-bottom: 1px solid ${palette.Gray400};
`

const BrandImage = styled.img`
  width: 5rem;
  height: 2.5rem;
  background-color: ${palette.Gray100};
`

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: ${palette.Gray100};
`

const ProductInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

export default SearchResult
