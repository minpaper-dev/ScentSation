import React, { useState } from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

const Write = () => {
  const { state } = useLocation()

  const [productInfo, setProductInfo] = useState(state)
  return (
    <>
      <Header pageName={'리뷰 작성'} />
      <ProductImage src={productInfo.image} />
    </>
  )
}

const ProductImage = styled.img`
  width: 80%;
`

export default Write
