import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import MainComponent from '../components/Main/MainComponent'
import MainSearch from '../components/Main/MainSearch'
import MainCategories from '../components/Main/MainCategories'
import MainVote from '../components/Main/MainVote'
import MainReview from '../components/Main/MainReview'
import CustomLogo from '../components/Custom/CustomLogo'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Main = () => {
  const auth = getAuth()
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

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        localStorage.setItem('uid', JSON.stringify(user.uid))
      }
    })
  }, [])

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

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 480px;
  height: 5rem;
  background-color: white;
  padding: 2rem 1rem;
  z-index: 999;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding-top: 5rem;
  padding-bottom: 100px;
`

export default Main
