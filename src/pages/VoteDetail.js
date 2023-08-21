import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import VoteItem from '../components/Vote/VoteItem'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { myInfoState } from '../recoil/atoms'
import CustomFont from '../styles/CustomFont'

const VoteDetail = () => {
  const { id } = useParams()
  const { getDataWithQuery, getDataOne, addData } = useFirestore()

  const [myInfo] = useRecoilState(myInfoState)
  const [voteData, setVoteData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [comment, setComment] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await getDataOne('vote', id)
    setVoteData({ ...result.data(), id: result.id })
    getComment(result.id)

    setIsLoading(false)
  }

  const getComment = async voteId => {
    const result = await getDataWithQuery('comment', 'voteId', '==', voteId)
    setComment(result.reverse())
  }

  const postComment = async () => {
    await addData('comment', '', {
      voteId: voteData.id,
      userInfo: myInfo,
      content: content,
    })
    getComment(voteData.id)
  }

  return (
    <>
      <Header pageName={''} />
      {!isLoading && (
        <Container>
          <VoteItem data={voteData} />
          {comment.map(item => (
            <Comment key={item.id}>
              <CustomFont content={item.content} />
            </Comment>
          ))}
          <Input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button onClick={postComment}>
            <CustomFont content={'등록하기'} />
          </Button>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  padding: 3rem;
`

const Input = styled.input``

const Button = styled.button``

const Comment = styled.div``

export default VoteDetail
