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

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { FreeMode, Pagination } from 'swiper/modules'

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
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          style={{ paddingRight: 15 }}
        >
          {FILTER_CATEGORY.map((item, index) => (
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

      {product.map(item => (
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
const EmptyView = styled.div`
  width: 40rem;
  height: 1rem;
`

const Tag = styled.button`
  background-color: ${props => props.$bgc};
  border-radius: 1rem;
  width: 5rem;
  padding: 0.6rem 0;
`

export default Filter
