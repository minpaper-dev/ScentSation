import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Header from '../components/Header'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'
import ProfileItem from '../components/Profile/ProfileItem'
import { useNavigate } from 'react-router-dom'
import VoteProduct from '../components/Vote/VoteProduct'
import VoteItem from '../components/Vote/VoteItem'
import Loader from '../components/Loader'

const Vote = () => {
  const navigate = useNavigate()
  const { getDataAll } = useFirestore()

  const [votes, setVotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getVotes()
  }, [])

  const getVotes = async () => {
    const result = await getDataAll('vote')
    setVotes(result)
    setIsLoading(false)
  }

  const registerVote = () => {
    navigate('/vote/register')
  }

  const goToDetail = id => {
    navigate(`${id}`)
  }

  return (
    <>
      <Header pageName={'투표'} />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <WrapFloatingButton>
            <FloatingButton onClick={registerVote}>
              <CustomFont content={'투표 올리기'} />
            </FloatingButton>
          </WrapFloatingButton>

          {votes.map(data => (
            <WrapVoteItem>
              <VoteItem key={data.id} data={data} />
              <Comment onClick={() => goToDetail(data.id)}>
                <CustomFont size={1.2} content={'댓글'} />
              </Comment>
            </WrapVoteItem>
          ))}
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  padding: 3rem 2rem 10rem;
`

const WrapFloatingButton = styled.div`
  width: 100vw;
  max-width: 48rem;
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 7rem;
  padding: 0 4rem;
  z-index: 999;
`

const FloatingButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  background-color: ${palette.Brown300};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

const Comment = styled.button``

const WrapVoteItem = styled.div`
  background-color: ${palette.Brown100};
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
`

export default Vote
