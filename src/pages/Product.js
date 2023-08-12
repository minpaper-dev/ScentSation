import React, { useEffect, useState } from 'react'
import CustomFont from '../styles/CustomFont'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import CustomTags from '../styles/CustomTags'
import useFirestore from '../hooks/useFirestore'
import { REVIEW_DATA_COLOR, REVIEW_DATA_TEXT } from '../common/data'
import ReviewItem from '../components/Review/ReviewItem'

const Product = () => {
  const { id } = useParams()
  const { getDataWithQuery } = useFirestore()

  const [reviewCount, setReviewCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [reviewData, setReviewData] = useState({
    gender: {
      male: 0,
      female: 0,
      neutral: 0,
    },
    season: {
      spring: 0,
      summer: 0,
      autumn: 0,
      winter: 0,
    },
    vitality: {
      cologne: 0,
      toilette: 0,
      perfume: 0,
    },
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let obj = { ...reviewData }
    const result = await getDataWithQuery('review', 'product.id', '==', 1)
    setReviews(result)
    result.map(item => {
      obj.gender[item.gender]++
      obj.season[item.season]++
      obj.vitality[item.vitality]++
      setReviewCount(reviewCount + 1)
    })
    setReviewData(obj)
    console.log(obj)
    setIsLoading(false)
  }

  return (
    <>
      {!isLoading && (
        <Container>
          <CustomFont content={'상품'} />
          <ProductImage />
          <ProductInfo>
            <CustomFont content={'브랜드'} />
            <CustomFont content={'이름'} />
            <Flex>
              <CustomFont content={'별점'} />
              <CustomFont content={'리뷰 개수'} />
            </Flex>
          </ProductInfo>
          <Divider />
          <WrapTags>
            <CustomTags size={0.8} content={'# 남성'} />
            <CustomTags size={0.8} content={'# 봄'} />
            <CustomTags size={0.8} content={'# 지속력 약함'} />
          </WrapTags>
          {Object.keys(reviewData).map(item => (
            <WrapGraph key={item}>
              <BarGraph>
                {Object.keys(reviewData[item]).map(category => (
                  <BarGraphItem
                    $width={(reviewCount / reviewData[item][category]) * 100}
                    bgc={REVIEW_DATA_COLOR[category]}
                    key={`${item}-${category}`}
                  />
                ))}
              </BarGraph>

              {Object.keys(reviewData[item]).map(category => (
                <GraphText key={`${item}-${category}`}>
                  <CustomFont content={REVIEW_DATA_TEXT[category]} />
                  <CustomFont
                    content={`${
                      reviewData[item][category]
                        ? (reviewCount / reviewData[item][category]) * 100
                        : 0
                    }%`}
                    $marginBt={1}
                  />
                </GraphText>
              ))}
            </WrapGraph>
          ))}
          <Divider />
          <WrapReview>
            {reviews.map(review => (
              <ReviewItem key={review.id} />
            ))}
          </WrapReview>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${palette.Gray100};
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Flex = styled.div`
  display: flex;
`
const WrapTags = styled.div`
  width: 90%;
  display: flex;
  margin: 1rem auto 0;
`

const Divider = styled.div`
  width: 100%;
  height: 1rem;
  background-color: ${palette.Gray300};
`

const WrapGraph = styled.div`
  width: 90%;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const BarGraph = styled.div`
  display: flex;
  overflow: hidden;
  height: 1rem;
  border-radius: 1rem;
  margin: 2rem 0;
`

const BarGraphItem = styled.div`
  width: ${props => props.$width}%;
  height: 100%;
  /* border-radius: 1rem; */
  background-color: ${props => props.bgc};
`

const GraphText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const WrapReview = styled.div`
  width: 90%;
  margin: 2rem auto;
`

export default Product
