import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Header from '../components/Header'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'
import ProfileItem from '../components/Profile/ProfileItem'
import { useNavigate } from 'react-router-dom'

const Vote = () => {
  const navigate = useNavigate()
  const { getDataAll } = useFirestore()

  const [votes, setVotes] = useState([])

  useEffect(() => {
    getVotes()
  }, [])

  const getVotes = async () => {
    const result = await getDataAll('vote')
    setVotes(result)
    console.log(result)
  }

  const registerVote = () => {
    navigate('/vote/register')
  }

  return (
    <>
      <Header pageName={'투표'} />
      <Container>
        <Button onClick={registerVote}>
          <CustomFont content={'나도 투표 올리기'} />
        </Button>

        {votes.map(vote => (
          <VoteItem key={vote.id}>
            <ProfileItem data={vote.userInfo} />
            <CustomFont
              content={vote.description}
              $marginTop={1}
              $marginBt={1}
            />
            <WrapVoteButton>
              <VoteButton>
                <CustomFont content={vote.perfume[0].brand} />
                <CustomFont content={vote.perfume[0].name} />
              </VoteButton>
              <VoteButton>
                <CustomFont content={vote.perfume[0].brand} />
                <CustomFont content={vote.perfume[1].name} />
              </VoteButton>
            </WrapVoteButton>
          </VoteItem>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: ${palette.Brown100};
`

const Button = styled.button`
  background-color: ${palette.Brown200};
  padding: 1rem;
  border-radius: 1rem;
`

const VoteItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`

const WrapVoteButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const VoteButton = styled.button`
  width: 45%;
  border: 1px solid black;
  padding: 1rem 0;
  border-radius: 1rem;
`

export default Vote
