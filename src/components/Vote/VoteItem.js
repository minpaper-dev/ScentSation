import React, { useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import ProfileItem from '../Profile/ProfileItem'
import VoteProduct from './VoteProduct'
import palette from '../../styles/CustomColor'

const VoteItem = ({ data }) => {
  const [isVote, setIsVote] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const onVote = perfume => {
    console.log(perfume)
    setIsVote(true)
    setSelectedItem(perfume.id)
  }
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
          <VoteButton
            onClick={() => onVote(data.perfume[0])}
            isSelected={selectedItem === data.perfume[0].id}
          >
            <VoteProduct data={data.perfume[0]} />

            <VoteResult isVote={isVote} />
            {isVote && (
              <>
                <CustomFont
                  size={1.6}
                  color={palette.Brown200}
                  content={'50%'}
                  weight={800}
                />
              </>
            )}
          </VoteButton>
          <VoteButton
            onClick={() => onVote(data.perfume[1])}
            isSelected={selectedItem === data.perfume[1].id}
          >
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
  border: ${props => (props.isSelected ? `2px solid ${palette.Brown200}` : 0)};

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
  width: ${props => (props.isVote ? '50%' : '0')};
  transition: width 0.5s ease; /* 애니메이션 효과 설정 */
`

export default VoteItem
