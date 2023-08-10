import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import palette from '../styles/CustomColor'
import MainComponent from '../components/Main/MainComponent'
import MainSearch from '../components/Main/MainSearch'
import MainCategories from '../components/Main/MainCategories'
import MainVote from '../components/Main/MainVote'
import MainReview from '../components/Main/MainReview'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import useFirestore from '../hooks/useFirestore'

const Main = () => {
  const auth = getAuth()
  const { getDataAll, getDataOne } = useFirestore()

  const MainContent = [
    {
      title: '향료별로 찾기',
      component: <MainCategories />,
    },
    {
      title: '투표',
      component: <MainVote />,
    },
    {
      title: '최신 리뷰',
      component: <MainReview />,
    },
  ]

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        getUserInfo(uid)
        // setUserId(uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [])

  const getUserInfo = async uid => {
    const data1 = await getDataAll('user')
    const data2 = await getDataOne('user', uid)
    console.log(data1, data2)
  }

  return (
    <>
      <Container>
        <MainSearch />
        {MainContent.map(contents => (
          <MainComponent
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
