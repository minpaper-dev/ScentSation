import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { useNavigate } from 'react-router-dom'

const MainSearch: React.FC = () => {
  const navigate = useNavigate()

  const navigateToSearch = () => {
    navigate('/search')
  }

  return (
    <Container>
      <CustomFont
        size={2.5}
        weight={800}
        content={'어떤 향수를 찾으세요?'}
        $marginTop={4}
        $marginBt={4}
      />
      <WrapInput onClick={navigateToSearch}>
        <CustomFont
          size={1.5}
          content={'제품명, 브랜드를 입력해보세요 : )'}
          color={palette.Gray200}
        />
        <SearchButton>
          <CustomFont size={2} content={'🔍'} />
        </SearchButton>
      </WrapInput>
    </Container>
  )
}

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-bottom: 3rem;
`

const WrapInput = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  border: 1px solid #f5f5f5;
  border-radius: 1.6rem;
  padding: 1.6rem;
  color: #a0a0a0;
  cursor: pointer;
`

const SearchButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  border-radius: 1.5rem;
  height: 100%;
  width: 16%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export default MainSearch
