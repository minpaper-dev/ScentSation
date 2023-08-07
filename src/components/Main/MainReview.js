import React from 'react'
import ReviewItemWithProduct from '../Review/ReviewItemWithProduct'
import { styled } from 'styled-components'

const MainReview = () => {
  return (
    <Container>
      <ReviewItemWithProduct />
    </Container>
  )
}

const Container = styled.div`
  min-width: 380px;
`
export default MainReview
