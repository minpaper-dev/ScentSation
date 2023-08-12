import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { Link } from 'react-router-dom'

const MainSearch = () => {
  return (
    <Container>
      <CustomFont
        weight={800}
        content={'어떤 향수를 찾으세요?'}
        marginBt={20}
      />
      <Link to={'/search'}>
        <WrapInput>
          <CustomFont
            content={'제품명, 브랜드를 입력해보세요 : )'}
            color={palette.Gray200}
          />
          <SearchButton>🔍</SearchButton>
        </WrapInput>
      </Link>
      <RecommendList>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
        <RecommendItem>
          <CustomFont content={'딥디크'} />
        </RecommendItem>
      </RecommendList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const WrapInput = styled.div`
  position: relative;
  width: 400px;
  border: 1px solid #f5f5f5;
  border-radius: 16px;
  padding: 15px;
  color: #a0a0a0;

  cursor: pointer;
`

const SearchButton = styled.div`
  background-color: #bdb1a6;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  border-radius: 16px;
  padding: 15px 20px;

  cursor: pointer;
`

const RecommendList = styled.ul`
  display: flex;
  color: #4a4a4a;
  margin: 20px 0px 30px 0px;
`

const RecommendItem = styled.li`
  list-style: none;
  margin: 0px 8px;
`

export default MainSearch
