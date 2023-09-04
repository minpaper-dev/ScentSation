import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import ProfileItem from '../Profile/ProfileItem'
import VoteProduct from './VoteProduct'
import palette from '../../styles/CustomColor'
import useFirestore from '../../hooks/useFirestore'
import CustomButtonModal from '../Custom/CustomButtonModal'
import { MY_UID } from '../../common/localstorage'
import { useLocation, useNavigate } from 'react-router-dom'
import type { VoteInterface } from '../../pages/Main'
import type { PerfumeInterface } from '../../pages/Main'

interface VoteItemProps {
  data: VoteInterface
  setIsLoginModal: (value: boolean) => void
  onDeleteVote?: { mutate: (params: { id: string }) => void }
  isGoBack?: boolean
}

const VoteItem: React.FC<VoteItemProps> = ({
  data,
  setIsLoginModal,
  onDeleteVote,
  isGoBack,
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { updateData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem(MY_UID) || 'null')

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isVote, setIsVote] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [voteCount, setVoteCount] = useState(0)

  useEffect(() => {
    let count = 0
    if (data.perfume) {
      data.perfume.map((item, index) => {
        if (item.count) {
          count += item.count
        }
        if (item.voteUser?.includes(uid)) {
          setIsVote(true)
          setSelectedIndex(index)
        }
      })
    }

    setVoteCount(count)
  }, [isVote, data.perfume, uid])

  const onVote = async (index: number) => {
    if (isVote) return
    if (!uid) {
      setIsLoginModal(true)
      return
    }

    const updateValue = data.perfume
    updateValue[index].count++

    updateValue[index].voteUser.push(uid)

    setIsVote(true)
    setSelectedIndex(index)
    await updateData('vote', data.id, { perfume: updateValue })
  }

  const onDeletevote = async () => {
    if (onDeleteVote) {
      onDeleteVote.mutate({ id: data.id })
      setIsDeleteModal(false)
      if (isGoBack) {
        navigate(-1)
      }
    }
  }

  const voteContainer = (perfume: PerfumeInterface, index: number) => {
    const percent = (
      ((perfume.count ? perfume.count : 0) / voteCount) *
      100
    ).toFixed()

    return (
      <VoteButton
        onClick={() => onVote(index)}
        $isSelected={selectedIndex === index}
      >
        <VoteProduct data={perfume} />
        <VoteResult $isVote={isVote} $percent={percent} />
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
        {pathname !== '/' && uid === data?.userInfo?.id && (
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
          {data?.perfume?.map((item, index) => voteContainer(item, index))}
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

const VoteButton = styled.button<{ $isSelected: boolean }>`
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

const VoteResult = styled.div<{ $isVote: boolean; $percent: string }>`
  position: absolute;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: ${palette.Brown200};
  opacity: 0.3;
  border-radius: inherit;
  width: ${props => (props.$isVote ? `${props.$percent}%` : '0')};
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
