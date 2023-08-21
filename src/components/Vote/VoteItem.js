import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import ProfileItem from '../Profile/ProfileItem'
import VoteProduct from './VoteProduct'
import { useNavigate } from 'react-router-dom'

const VoteItem = ({ data }) => {
  return (
    <>
      <Container key={data.id}>
        <ProfileItem data={data.userInfo} />
        <CustomFont
          size={1.2}
          content={data.description}
          $marginTop={2}
          $marginBt={2}
        />
        <WrapVoteButton>
          <VoteButton>
            <VoteProduct data={data.perfume[0]} />
          </VoteButton>
          <VoteButton>
            <VoteProduct data={data.perfume[1]} />
          </VoteButton>
        </WrapVoteButton>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`

const WrapVoteButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const VoteButton = styled.button`
  width: 48%;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: 1rem;
  margin-bottom: 19px;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    transform: scale(1.05);
  }
`

export default VoteItem
