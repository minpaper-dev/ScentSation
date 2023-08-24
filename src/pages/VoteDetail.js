import React, { useState } from 'react'
import { styled } from 'styled-components'
import { increment } from 'firebase/firestore/lite'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import { myInfoState } from '../recoil/atoms'
import { CommentOutlined } from '@ant-design/icons'

import Header from '../components/Header'
import VoteItem from '../components/Vote/VoteItem'
import CustomButtonModal from '../components/Custom/CustomButtonModal'
import CommentItem from '../components/Vote/CommentItem'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import useFirestore from '../hooks/useFirestore'

const VoteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { getDataWithQuery, addData, updateData, deleteData, getDataWithId } =
    useFirestore()

  const uid = JSON.parse(localStorage.getItem('uid'))

  const [myInfo] = useRecoilState(myInfoState)

  // 해당 투표 정보 조회
  const { data: voteData, isLoading: isVoteLoading } = useQuery({
    queryKey: 'vote',
    queryFn: () => getDataWithId('vote', id),
  })

  // 해당 투표의 댓글 조회
  const { data: commentData, isLoading: isCommentLoading } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => getDataWithQuery('comment', 'voteId', '==', id),
  })

  // 댓글 삭제
  const onDeleteComment = useMutation({
    mutationFn: () => deleteData('comment', deleteCommentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', id] })
    },
    onError: error => {
      console.log(`Delete Todo Error ${error}`)
    },
  })

  // 댓글 추가
  const onPostComment = useMutation({
    mutationFn: () =>
      addData('comment', '', {
        voteId: voteData.id,
        userInfo: myInfo,
        content: commentInputValue,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', id] })
    },
    onError: error => {
      console.log(`Delete Todo Error ${error}`)
    },
  })

  const [commentInputValue, setCommentInputValue] = useState('')
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isDeleteCommentModal, setIsDeleteCommentModal] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState('')

  const postComment = async () => {
    if (uid) {
      onPostComment.mutate()
      await updateData('vote', id, { commentCount: increment(1) })
      setCommentInputValue('')
    } else {
      setIsLoginModal(true)
    }
  }

  const deleteComment = async () => {
    onDeleteComment.mutate()
    await updateData('vote', id, { commentCount: increment(-1) })

    setIsDeleteCommentModal(false)
    setDeleteCommentId('')
  }

  return (
    <>
      <Header pageName={'댓글'} />
      {!isVoteLoading && !isCommentLoading && (
        <Container>
          <VoteItem data={voteData} setIsLoginModal={setIsLoginModal} />
          <Flex>
            <CommentOutlined style={{ fontSize: '3rem' }} />
            <CustomFont content={commentData.length} $marginLf={0.5} />
          </Flex>
          <WrapInput>
            <Input
              type="text"
              value={commentInputValue}
              onChange={e => setCommentInputValue(e.target.value)}
            />
            <AddButton onClick={postComment}>
              <CustomFont content={'등록하기'} />
            </AddButton>
          </WrapInput>
          {commentData.map(item => (
            <>
              <CommentItem
                key={item.id}
                item={item}
                uid={uid}
                setDeleteCommentId={setDeleteCommentId}
                setIsDeleteCommentModal={setIsDeleteCommentModal}
              />
              <Divider />
            </>
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
          {isDeleteCommentModal && (
            <CustomButtonModal
              content={'정말로 댓글을 삭제하시겠습니까?'}
              yesEvent={deleteComment}
              noEvent={() => setIsDeleteCommentModal(false)}
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
  padding: 0px 2rem 10rem;
`

const WrapInput = styled.div`
  background-color: ${palette.Gray400};
  border: 1px solid ${palette.Gray300};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  background-color: ${palette.Gray400};
  width: 80%;
  border: 0px;
  outline: none;
`

const AddButton = styled.button`
  width: 20%;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.Gray300};
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

export default VoteDetail
