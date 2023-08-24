import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import Header from '../components/Header'
import ProfileDetail from '../components/Profile/ProfileDetail'
import ReviewItemWithProduct from '../components/Review/ReviewItemWithProduct'
import useFirestore from '../hooks/useFirestore'
import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const UserReview = () => {
  const { id } = useParams()
  const { getDataWithId, getDataWithQuery } = useFirestore()

  // 사용자 리뷰 조회
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getDataWithId('user', id),
  })

  // 사용자 리뷰 조회
  const { data: reviewData, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getDataWithQuery('review', 'user.id', '==', id),
  })

  // 페이지네이션 관련 상태
  const reviewsPerPage = 5 // 페이지 당 보여줄 리뷰 개수
  const [currentPage, setCurrentPage] = useState(1)
  const [scrollToTop, setScrollToTop] = useState(false)

  // 현재 페이지에 해당하는 리뷰 데이터 추출
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const reviewsToShow = reviewData.slice(startIndex, endIndex)

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setScrollToTop(false)
    }
  }, [scrollToTop])

  const onClickPageButton = pageNumber => {
    setCurrentPage(pageNumber)
    setScrollToTop(true)
  }

  return (
    <>
      <Header pageName={'사용자 리뷰'} />

      {!isUserLoading && !isReviewLoading && (
        <Container>
          <ProfileDetail userInfo={userData} />
          <WrapReview>
            {reviewsToShow.map(data => (
              <ReviewItemWithProduct
                key={data.id}
                data={data}
                isNoProfile={true}
              />
            ))}
            {/* {reviewData.map(data => (
              <ReviewItemWithProduct
                key={data.id}
                data={data}
                isNoProfile={true}
              />
            ))} */}
          </WrapReview>
          <Pagination>
            <PageButton
              onClick={() => onClickPageButton(1)}
              isActive={currentPage === 1}
            >
              <LeftOutlined style={{ fontSize: '1.5rem' }} />
            </PageButton>

            {Array.from(
              { length: Math.ceil(reviewData.length / reviewsPerPage) },
              (_, index) => (
                <PageButton
                  key={index + 1}
                  onClick={() => onClickPageButton(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  <CustomFont
                    size={1.2}
                    content={index + 1}
                    weight={currentPage === index + 1 ? 600 : 400}
                  />
                </PageButton>
              )
            )}
            <PageButton
              onClick={() =>
                onClickPageButton(Math.ceil(reviewData.length / reviewsPerPage))
              }
              isActive={
                currentPage === Math.ceil(reviewData.length / reviewsPerPage)
              }
            >
              <RightOutlined style={{ fontSize: '1.5rem' }} />
            </PageButton>
          </Pagination>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: ${palette.Brown100};
  padding-top: 2rem;
  padding-bottom: 10rem;
`

const WrapReview = styled.div`
  width: 80%;
  margin: 2rem auto;
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`

const PageButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`
export default UserReview
