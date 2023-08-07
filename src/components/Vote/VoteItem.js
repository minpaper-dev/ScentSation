import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import ProfileItem from '../Profile/ProfileItem'

const VoteItem = () => {
  return (
    <Container>
      <ProfileItem />
      <CustomFont
        size={12}
        content={
          '안녕하세요 제가 이런저런 이유로 향수를 고민중인데 투표 부탁드려요'
        }
        marginBt={18}
        marginTop={18}
      />
      <VoteList>
        <VoteBox>
          <CustomFont size={10} content={'어나더 13'} />
        </VoteBox>
        <VoteBox>
          <CustomFont size={10} content={'어나더 13'} />
        </VoteBox>
      </VoteList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const VoteList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
`

const VoteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid ${palette.Gray300};
  border-radius: 8px;
  padding: 10px 0px;
  cursor: pointer;
`

export default VoteItem
