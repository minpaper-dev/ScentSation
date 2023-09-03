import React from 'react'
import { styled } from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'

import Loader from '../components/Loader'
import Header from '../components/Header'
import ProductListItem from '../components/Product/ProductListItem'
import useFirestore from '../hooks/useFirestore'

interface Product {
  id: string
  brand: string
  category: string[]
  image: string
  name: string
  price: number
  size: number
}

const Brand = () => {
  const { id } = useParams()
  const { state } = useLocation()

  const { getDataWithQuery } = useFirestore()

  // const { data: productData, isLoading: isProductLoading } = useQuery<Product[], Error>(
  //   ['product', id], // queryKey
  //   () => getDataWithQuery('product', 'brand', '==', state.name) // queryFn
  // )

  // if (isProductLoading) return <Loader />

  return (
    <>
      <Header pageName={state.name} />
      <Container>
        {/* {productData.map(item => (
          <ProductListItem item={item} />
        ))} */}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

export default Brand
