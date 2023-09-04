import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Header from '../components/Header'
import Loader from '../components/Loader'
import VoteItem from '../components/Vote/VoteItem'
import CustomButtonModal from '../components/Custom/CustomButtonModal'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'
import { MY_UID } from '../common/localstorage'
import { VoteInterface } from './Main'

const Vote = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { getDataAll, deleteData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem(MY_UID) || 'null')

  // vote Data 조회
  const { data: voteData, isLoading } = useQuery<VoteInterface[] | undefined>(
    ['vote'],
    () => getDataAll<VoteInterface[]>('vote'),
    { initialData: [] }
  )

  // 해당 vote 삭제
  // const onDeleteVote = useMutation(({ id }) => deleteData('vote', id), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['vote'] })
  //   },
  //   onError: error => {
  //     console.log(`Delete Todo Error ${error}`)
  //   },
  // })

  const [isLoginModal, setIsLoginModal] = useState(false)

  const onClickRegisterVoteButton = () => {
    if (uid) {
      navigate('/vote/register')
      return
    }
    if (!uid) {
      setIsLoginModal(true)
      return
    }
  }

  return (
    <>
      <Header pageName={'투표'} />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <WrapFloatingButton>
            <FloatingButton onClick={onClickRegisterVoteButton}>
              <CustomFont content={'투표 올리기'} />
            </FloatingButton>
          </WrapFloatingButton>

          {voteData &&
            voteData.map(data => (
              <WrapVoteItem key={data.id}>
                <VoteItem
                  data={data}
                  // onDeleteVote={onDeleteVote}
                  setIsLoginModal={setIsLoginModal}
                />
                <Comment onClick={() => navigate(data.id)}>
                  <CustomFont
                    size={1.2}
                    content={`댓글 (${data.commentCount})`}
                  />
                </Comment>
              </WrapVoteItem>
            ))}
          {isLoginModal && (
            <CustomButtonModal
              content={`로그인 한 유저만 사용가능한 기능입니다.
        로그인 하러 이동하시겠습니까?`}
              yesEvent={() => {
                setIsLoginModal(false)
                navigate('/login')
              }}
              noEvent={() => setIsLoginModal(false)}
            />
          )}
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
