import React, { useEffect, useState } from 'react'
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

  // const [products, setProduct] = useState([])

  // useEffect(()=>{
  //     getProduct()
  // },[])

  // const getProduct = async () => {
  //     const data = await getData('products')
  //     setProduct(data)
  // }

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
