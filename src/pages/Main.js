import React from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import MainComponent from '../components/Main/MainComponent'
import MainSearch from '../components/Main/MainSearch'
import MainCategories from '../components/Main/MainCategories'
import MainVote from '../components/Main/MainVote'
import MainReview from '../components/Main/MainReview'

const Main = () => {
  const MainContent = [
    {
      id: 0,
      title: '향료별로 찾기',
      component: <MainCategories />,
    },
    {
      id: 1,
      title: '투표',
      component: <MainVote />,
    },
    {
      id: 2,
      title: '최신 리뷰',
      component: <MainReview />,
    },
  ]

  return (
    <>
      <Container>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${palette.Brown100};
  padding-bottom: 100px;
`

export default Main
