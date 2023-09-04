import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Header from '../components/Header'
import ProfileDetail from '../components/Profile/ProfileDetail'
import useFirestore from '../hooks/useFirestore'
import palette from '../styles/CustomColor'
import CustomFont from '../styles/CustomFont'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Loader from '../components/Loader'
import ReviewItem from '../components/Review/ReviewItem'
import { ReviewInterface, UserInterface } from './Main'

const UserReview = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { getDataWithId, getDataWithQuery, deleteData } = useFirestore()

  // 사용자 리뷰 조회
  const { data: userData, isLoading: isUserLoading } = useQuery<
    UserInterface | undefined
  >(['user', id], () => getDataWithId<UserInterface>('user', id))

  // 사용자 리뷰 조회
  const { data: reviewData, isLoading: isReviewLoading } = useQuery<
    ReviewInterface[] | undefined
  >(
    ['review', id],
    () => getDataWithQuery<ReviewInterface[]>('review', 'user.id', '==', id),
    { initialData: [] }
  )

  // 리뷰 삭제
  const onDeleteVote = useMutation(
    ({ id }: { id: string }) => deleteData('review', id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['review'] })
      },
      onError: error => {
        console.log(`Delete Todo Error ${error}`)
      },
    }
  )

  // 페이지네이션 관련 상태
  const reviewsPerPage = 5 // 페이지 당 보여줄 리뷰 개수
  const [currentPage, setCurrentPage] = useState(1)
  const [scrollToTop, setScrollToTop] = useState(false)

  // 현재 페이지에 해당하는 리뷰 데이터 추출
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const reviewsToShow = reviewData ? reviewData.slice(startIndex, endIndex) : []

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setScrollToTop(false)
    }
  }, [scrollToTop])

  const onClickPageButton = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setScrollToTop(true)
  }

  if (isUserLoading || isReviewLoading) return <Loader />

  return (
    <>
      <Header pageName={'사용자 리뷰'} />

      <Container>
        <ProfileDetail userInfo={userData} />
        <WrapReview>
          {reviewsToShow.map(data => (
            <Review key={data.id}>
              <ReviewItem
                data={data}
                onDeleteVote={onDeleteVote}
                isNoProfile={true}
              />
            </Review>
          ))}
        </WrapReview>
        <Pagination>
          <PageButton onClick={() => onClickPageButton(1)}>
            <LeftOutlined style={{ fontSize: '1.5rem' }} />
          </PageButton>

          {Array.from(
            { length: Math.ceil((reviewData?.length || 0) / reviewsPerPage) },
            (_, index) => (
              <PageButton
                key={index + 1}
                onClick={() => onClickPageButton(index + 1)}
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
              onClickPageButton(
                Math.ceil((reviewData?.length || 0) / reviewsPerPage)
              )
            }
          >
            <RightOutlined style={{ fontSize: '1.5rem' }} />
          </PageButton>
        </Pagination>
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  /* background-color: ${palette.Brown100}; */
  background-color: white;
  padding-top: 2rem;
  padding-bottom: 10rem;
`

const WrapReview = styled.div`
  width: 90%;
  margin: 2rem auto;
`

const Review = styled.div`
  background-color: ${palette.Brown100};
  padding: 5%;
  margin: 2rem 0;
  border-radius: 1rem;
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
