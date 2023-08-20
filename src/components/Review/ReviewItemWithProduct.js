import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import ReviewItem from './ReviewItem'
import { Link } from 'react-router-dom'
import ProductItem from '../Product/ProductItem'

const ReviewItemWithProduct = ({ data, isNoProfile }) => {
  return (
    <>
      <Link to={`/product/${data.product.id}`}>
        <ProductItem data={data.product} />
      </Link>
      <ReviewItem data={data} isNoProfile={isNoProfile} />
    </>
  )
}

export default ReviewItemWithProduct
