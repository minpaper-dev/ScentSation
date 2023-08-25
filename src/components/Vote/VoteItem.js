import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import ProfileItem from '../Profile/ProfileItem'
import VoteProduct from './VoteProduct'
import palette from '../../styles/CustomColor'
import useFirestore from '../../hooks/useFirestore'
import CustomButtonModal from '../Custom/CustomButtonModal'
import { v4 as uuidv4 } from 'uuid'

const VoteItem = ({ data, index, deleteVote, setIsLoginModal }) => {
  const { updateData, deleteData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem('uid'))

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isVote, setIsVote] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState('')
  const [voteCount, setVoteCount] = useState(0)

  useEffect(() => {
    let count = 0
    data.perfume.map((item, index) => {
      count += item.count
      if (item.voteUser.includes(uid)) {
        setIsVote(true)
        setSelectedIndex(index)
      }
    })
    setVoteCount(count)
  }, [isVote])

  const onVote = async index => {
    if (isVote) return
    if (!uid) {
      setIsLoginModal(true)
      return
    }

    let updateValue = [...data.perfume]
    updateValue[index].count++
    updateValue[index].voteUser.push(uid)

    setIsVote(true)
    setSelectedIndex(index)
    await updateData('vote', data.id, { perfume: updateValue })
  }

  const onDeletevote = async () => {
    await deleteData('vote', data.id)
    deleteVote(index)
    setIsDeleteModal(false)
  }

  const voteContainer = (perfume, index) => {
    let percent = ((perfume.count / voteCount) * 100).toFixed()

    return (
      <VoteButton
        key={uuidv4()}
        onClick={() => onVote(index)}
        $isSelected={selectedIndex === index}
      >
        <VoteProduct data={perfume} />
        <VoteResult $isVote={isVote} percent={percent} />
        <>
          {isVote && (
            <CustomFont
              size={1.6}
              color={palette.Brown200}
              content={`${percent}%`}
              weight={800}
            />
          )}
        </>
      </VoteButton>
    )
  }

  return (
    <>
      <Container key={data.id}>
        {uid === data.userInfo.id && (
          <WrapButton>
            <Button onClick={() => setIsDeleteModal(true)}>
              <CustomFont content={'삭제'} />
            </Button>
          </WrapButton>
        )}

        <ProfileItem data={data.userInfo} />
        <CustomFont
          size={1.2}
          content={data.description}
          $marginTop={2}
          $marginBt={2}
        />
        <WrapVoteButton>
          {data.perfume.map((item, index) => voteContainer(item, index))}
        </WrapVoteButton>
        {isDeleteModal && (
          <CustomButtonModal
            content={'정말로 투표를 삭제하시겠습니까?'}
            yesEvent={onDeletevote}
            noEvent={() => setIsDeleteModal(false)}
          />
        )}
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
  flex-direction: column;
  justify-content: space-between;
`

const VoteButton = styled.button`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: ${props => (props.$isSelected ? `2px solid ${palette.Brown200}` : 0)};

  margin-bottom: 2rem;
  cursor: pointer;
`

const VoteResult = styled.div`
  position: absolute;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: ${palette.Brown200};
  opacity: 0.3;
  border-radius: inherit;
  width: ${props => (props.$isVote ? `${props.percent}%` : '0')};
  transition: width 0.5s ease; /* 애니메이션 효과 설정 */
`

const WrapButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Button = styled.button`
  margin: 0 0.5rem;
`

export default VoteItem
