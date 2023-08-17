import React, { useEffect, useState } from 'react'
import CustomFont from '../styles/CustomFont'
import CustomTags from '../styles/CustomTags'
import { styled } from 'styled-components'
import { FILTER_CATEGORY } from '../common/data'
import palette from '../styles/CustomColor'
import ProductListItem from '../components/Product/ProductListItem'
import useFirestore from '../hooks/useFirestore'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'

const Filter = () => {
  const { state } = useLocation()
  const { getDataAll } = useFirestore()

  const [allProduct, setAllProduct] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    getProductList()
  }, [])

  useEffect(() => {
    filter()
  }, [category])

  const getProductList = async () => {
    const data = await getDataAll('product')
    setAllProduct(data)
    if (state.category) {
      setCategory(state.category)
    }
    setProduct(data)
  }

  const filter = () => {
    if (category === '전체') {
      setProduct(allProduct)
    } else {
      setProduct(allProduct.filter(item => item.category.includes(category)))
    }
  }

  return (
    <Container>
      <Header pageName={'필터'} />
      <WrapTags>
        {FILTER_CATEGORY.map((item, index) => (
          <CustomTags
            key={item}
            content={item}
            bgc={category === item ? palette.Brown500 : palette.Brown200}
            $marginRi={1}
            onClick={content => {
              console.log(content)
              setCategory(content)
            }}
          />
        ))}
      </WrapTags>

      <Sort>
        <CustomFont content={'리뷰 많은 순'} size={0.8} />
      </Sort>

      {product.map(item => (
        <ProductListItem key={item.id} item={item} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

const WrapTags = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
`

const Sort = styled.div`
  margin: 2rem 1rem 1rem;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  /* border: 1px solid ${palette.Gray400}; */
`

export default Filter
