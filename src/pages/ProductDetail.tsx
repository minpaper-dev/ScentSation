import React from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useFirestore from '../hooks/useFirestore'

interface ProductInterface {
  id: string
  brand: string
  category: string[]
  count: number
  image: string
  name: string
  price: number | string
  size: number | string
  voteUser: (string | null)[]
}

const ProductDetail = () => {
  const { id } = useParams()
  const { getDataWithQuery, getDataWithId, deleteData } = useFirestore()

  const { data, isLoading } = useQuery<ProductInterface | undefined>(
    ['product', id],
    () => getDataWithId<ProductInterface>('product', id)
  )

  return (
    <>
      <Header pageName="" />
    </>
  )
}

export default ProductDetail
