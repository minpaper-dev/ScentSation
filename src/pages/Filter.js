import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { FILTER_CATEGORY, SORT_LIST } from '../common/data'
import Header from '../components/Header'
import Loader from '../components/Loader'
import ProductListItem from '../components/Product/ProductListItem'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'
import { Select } from 'antd'

const Filter = () => {
  const { state } = useLocation()
  const { getDataAll } = useFirestore()

  const { data: productData, isLoading } = useQuery({
    queryKey: 'product',
    queryFn: () => getDataAll('product'),
  })

  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState(state.category || '')

  useEffect(() => {
    if (!isLoading) {
      filter()
    }
  }, [category, isLoading])

  const filter = () => {
    if (category === '전체') {
      setFilterProduct(productData)
    } else {
      setFilterProduct(
        productData?.filter(item => item.category.includes(category))
      )
    }
  }

  const handleChange = value => {
    console.log(`selected ${value}`)
  }

  if (isLoading) return <Loader />
  return (
    <Container>
      <Header pageName={'필터'} />
      <WrapTags>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          style={{ paddingRight: 15 }}
        >
          {FILTER_CATEGORY.map(item => (
            <SwiperSlide key={item}>
              <Tag
                $bgc={category === item ? palette.Brown500 : palette.Brown200}
                onClick={() => {
                  setCategory(item)
                }}
              >
                <CustomFont
                  color={'white'}
                  weight={category === item ? 600 : 400}
                  content={item}
                />
              </Tag>
            </SwiperSlide>
          ))}
        </Swiper>
      </WrapTags>
      <WrapSelect>
        <Select
          defaultValue={SORT_LIST[0].label}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={SORT_LIST}
        />
      </WrapSelect>
      {filterProduct.map(item => (
        <ProductListItem key={item.id} item={item} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  padding-bottom: 10rem;
`

const WrapTags = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
  margin-bottom: 2rem;
`

const Tag = styled.button`
  background-color: ${props => props.$bgc};
  border-radius: 1rem;
  width: 100%;
  padding: 0.6rem 0;
`

const WrapSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;
`

export default Filter
