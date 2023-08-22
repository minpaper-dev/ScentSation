import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import VoteItem from '../components/Vote/VoteItem'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { myInfoState } from '../recoil/atoms'
import CustomFont from '../styles/CustomFont'
import palette from '../styles/CustomColor'
import { CommentOutlined } from '@ant-design/icons'
import { increment } from 'firebase/firestore/lite'
import CustomButtonModal from '../components/Custom/CustomButtonModal'

const VoteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDataWithQuery, getDataOne, addData, updateData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem('uid'))

  const [myInfo] = useRecoilState(myInfoState)
  const [voteData, setVoteData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [comment, setComment] = useState([])
  const [isLoginModal, setIsLoginModal] = useState(false)

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
    if (uid) {
      await addData('comment', '', {
        voteId: voteData.id,
        userInfo: myInfo,
        content: content,
      })
      await updateData('vote', id, { commentCount: increment(1) })
      getComment(voteData.id)
      setContent('')
    } else {
      setIsLoginModal(true)
    }
  }

  return (
    <>
      <Header pageName={'댓글'} />
      {!isLoading && (
        <Container>
          <VoteItem data={voteData} setIsLoginModal={setIsLoginModal} />
          <Flex>
            <CommentOutlined style={{ fontSize: '3rem' }} />
            <CustomFont content={comment.length} $marginLf={0.5} />
          </Flex>
          <WrapInput>
            <Input
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Button onClick={postComment}>
              <CustomFont content={'등록하기'} />
            </Button>
          </WrapInput>
          {comment.map(item => (
            <>
              <Comment key={item.id}>
                <WrapProfile>
                  <ProfileImage src={item.userInfo.image} />
                  <CustomFont
                    content={item.userInfo.nickname}
                    $marginRi={1}
                    $marginLf={1}
                  />
                  <CustomFont
                    content={`${item.userInfo.age}세 / ${item.userInfo.category} / ${item.userInfo.gender}`}
                  />
                </WrapProfile>
                <CustomFont size={1.2} content={item.content} $marginLf={1} />
              </Comment>
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

const Button = styled.button`
  width: 20%;
`

const Comment = styled.div`
  padding: 1rem 0;
`

const WrapProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
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
