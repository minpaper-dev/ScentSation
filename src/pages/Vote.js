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

  const goToDetail = id => {
    navigate(`${id}`)
  }

  return (
    <>
      <Header pageName={'투표'} />
      <Container>
        <WrapFloatingButton>
          <FloatingButton onClick={registerVote}>
            <CustomFont content={'나도 투표 올리기'} />
          </FloatingButton>
        </WrapFloatingButton>

        {votes.map(data => (
          <>
            <VoteItem key={data.id} data={data} />
            <Comment onClick={() => goToDetail(data.id)}>
              <CustomFont content={'댓글'} />
            </Comment>
          </>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: ${palette.Brown100};
  padding: 3rem 2rem;
`

const WrapFloatingButton = styled.div`
  width: 480px;
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 4rem;
  padding: 0 3rem;
`

const FloatingButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  background-color: ${palette.Brown300};
`

const Comment = styled.button``

export default Vote
