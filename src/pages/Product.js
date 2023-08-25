import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FrownOutlined, StarFilled } from '@ant-design/icons'

import { REVIEW, REVIEW_DATA_COLOR, REVIEW_DATA_TEXT } from '../common/data'
import Header from '../components/Header'
import ReviewItem from '../components/Review/ReviewItem'
import CustomButtonModal from '../components/Custom/CustomButtonModal'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'
import Loader from '../components/Loader'
import { MY_UID } from '../common/localstorage'
import { Rate } from 'antd'
import { StarOutline } from '@mui/icons-material'

const Product = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const { getDataWithQuery, getDataWithId, deleteData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem(MY_UID))

  // 상품 정보 조회
  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getDataWithId('product', id),
  })

  // 상품의 리뷰 정보 조회
  const { data: reviewData, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getDataWithQuery('review', 'product.id', '==', id),
    staleTime: 0,
    initialData: [],
  })

  // 리뷰 삭제
  const onDeleteVote = useMutation(({ id }) => deleteData('review', id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] })
    },
    onError: error => {
      console.log(`Delete Todo Error ${error}`)
    },
  })

  const [isLoginModal, setIsLoginModal] = useState(false)
  const [summaryReviewData, setSummaryReviewData] = useState(REVIEW)
  const [rate, setRate] = useState(0)

  useEffect(() => {
    // 리뷰 통계 작업
    let obj = JSON.parse(JSON.stringify(REVIEW))
    let count = 0

    if (reviewData.length > 0) {
      reviewData.map((item, index) => {
        obj.gender[item.gender]++
        obj.season[item.season]++
        obj.vitality[item.vitality]++
        count += item.rate
      })
      setRate((count / reviewData.length).toFixed(1))
      setSummaryReviewData(obj)
    }
  }, [reviewData])

  const goReviewWrite = () => {
    if (uid) {
      navigate('/write', { state: { productInfo: productData } })
    } else {
      setIsLoginModal(true)
    }
  }

  if (isProductLoading || isReviewLoading) return <Loader />

  return (
    <>
      <Container>
        <Header pageName={''} />
        <ProductImage src={productData.image} />
        <ProductInfo>
          <CustomFont size={1.2} content={productData.brand} $marginBt={1} />
          <CustomFont
            size={1.6}
            content={productData.name}
            weight={800}
            $marginBt={1}
          />
          <Flex>
            <CustomFont
              size={1.2}
              content={`${productData.size}ml / ${productData.price}원`}
            />
          </Flex>
          <WrapRate>
            <Rate
              character={
                <StarFilled style={{ fontSize: '3rem', width: '1.5rem' }} />
              }
              value={rate}
              disabled
              allowHalf
              style={{ display: 'flex', alignItems: 'center' }}
            />
            <CustomFont size={1.2} content={`(${rate})`} $marginLf={1} />
          </WrapRate>
          <CustomFont
            size={1}
            content={`리뷰 : ${reviewData.length}개`}
            $marginTop={1}
          />
        </ProductInfo>
        <Divider />
        {reviewData.length === 0 ? (
          <NoReview>
            <FrownOutlined style={{ fontSize: '5rem' }} />
            <CustomFont
              size={1.2}
              weight={600}
              content={'아직 작성된 리뷰가 없습니다.'}
              $marginTop={1.5}
            />
          </NoReview>
        ) : (
          <>
            {Object.keys(summaryReviewData).map(item => (
              <WrapGraph key={item}>
                <BarGraph>
                  {Object.keys(summaryReviewData[item]).map(category => (
                    <BarGraphItem
                      $width={
                        (summaryReviewData[item][category] /
                          reviewData.length) *
                        100
                      }
                      bgc={REVIEW_DATA_COLOR[category]}
                      key={`${item}-${category}`}
                    />
                  ))}
                </BarGraph>

                {Object.keys(summaryReviewData[item]).map(category => (
                  <GraphText key={`${item}-${category}`}>
                    <CustomFont
                      size={1.2}
                      content={REVIEW_DATA_TEXT[category]}
                    />
                    <CustomFont
                      size={1.2}
                      content={`${
                        summaryReviewData[item][category]
                          ? (
                              (summaryReviewData[item][category] /
                                reviewData.length) *
                              100
                            ).toFixed(1)
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
              {reviewData.map((review, index) => (
                <ReviewItem
                  key={review.id}
                  data={review}
                  deleteReview={onDeleteVote}
                  onDeleteVote={onDeleteVote}
                  index={index}
                />
              ))}
            </WrapReview>
          </>
        )}

        <WrapFloatingButton>
          <FloatingButton onClick={goReviewWrite}>
            <CustomFont content={'리뷰쓰기'} />
          </FloatingButton>
        </WrapFloatingButton>
        {isLoginModal && (
          <CustomButtonModal
            content={`로그인 한 유저만 사용가능한 기능입니다.
        로그인 하러 이동하시겠습니까?`}
            yesEvent={() => {
              setIsLoginModal(false)
              navigate('/login')
            }}
            noEvent={() => setIsLoginModal(false)}
          />
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  position: relative;
  padding-bottom: 5rem;
`

const ProductImage = styled.img`
  display: block;
  width: 60%;
  height: 60%;
  margin: 0 auto 2rem;
  background-color: white;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const WrapTags = styled.div`
  width: 90%;
  display: flex;
  margin: 2rem auto 0;
`

const Divider = styled.div`
  width: 100%;
  height: 1rem;
  background-color: ${palette.Gray300};
  margin-top: 2rem;
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

const WrapFloatingButton = styled.div`
  width: 100vw;
  max-width: 48rem;
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 7rem;
  padding: 0 2rem;
`

const FloatingButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  background-color: ${palette.Brown300};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

const NoReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`

const WrapRate = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`

export default Product
