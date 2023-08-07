import React from 'react'
import VoteItem from '../Vote/VoteItem'
import { styled } from 'styled-components'

const MainVote = () => {
  return (
    <Container>
      <VoteItem />
    </Container>
  )
}

const Container = styled.div`
  min-width: 380px;
`

export default MainVote
