import React from 'react'
import { styled } from 'styled-components'
import MainComponent from '../components/Main/MainComponent'
import MainSearch from '../components/Main/MainSearch'
import MainCategories from '../components/Main/MainCategories'
import MainVote from '../components/Main/MainVote'
import MainReview from '../components/Main/MainReview'
import CustomLogo from '../components/Custom/CustomLogo'
import useFirestore from '../hooks/useFirestore'

import { useQuery } from '@tanstack/react-query'
import Loader from '../components/Loader'
interface UserInterface {
  id: string
  age: number | string
  auth: string
  category: string
  email: string
  gender: string
  image: string | null
  major: string
  nickname: string
  password: string | null
}

export interface PerfumeInterface {
  brand: string
  category: string[]
  count: number
  id: string
  image: string
  name: string
  price: number | string
  size: number | string
  voteUser: (string | null)[]
}

export interface VoteInterface {
  id: string
  commentCount?: number
  description?: string
  perfume?: PerfumeInterface[]
  userInfo?: UserInterface
}

export interface ReviewInterface {
  id: string
  description?: string
  product?: PerfumeInterface
  rate?: number
  gender?: string
  season?: string
  vitality?: string
  user?: UserInterface
}

const Main = () => {
  const { getDataAll } = useFirestore()

  const { data: voteData, isLoading: isVoteLoading } = useQuery<
    VoteInterface[]
  >(['vote'], () => getDataAll('vote'), {
    initialData: [],
  })

  const { data: reviewData, isLoading: isReviewLoading } = useQuery<
    ReviewInterface[]
  >(['review'], () => getDataAll('review'), {
    initialData: [],
  })

  const MainContent = [
    {
      id: 0,
      title: '향료별로 찾기',
      component: <MainCategories />,
    },
    {
      id: 1,
      title: '투표',
      component: <MainVote voteData={voteData} />,
    },
    {
      id: 2,
      title: '최신 리뷰',
      component: <MainReview reviewData={reviewData.slice(0, 5)} />,
    },
  ]

  if (isVoteLoading || isReviewLoading) return <Loader />

  return (
    <>
      <Container>
        <Header>
          <CustomLogo />
        </Header>
        <MainSearch />
        {MainContent.map(contents => (
          <MainComponent
            key={contents.id}
            title={contents.title}
            component={contents.component}
          />
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 48rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding-top: 5rem;
  padding-bottom: 10rem;
`
const Header = styled.div`
  width: 100vw;
  max-width: 48rem;
  top: 0;
  height: 6rem;
  background-color: rgba(255, 255, 255);
  padding: 1.5rem 4rem;
  z-index: 999;
`

export default Main
