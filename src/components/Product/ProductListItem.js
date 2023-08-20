import React from 'react'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { setMyVotePerfumeState } from '../../recoil/selectors'

const ProductListItem = ({ item, isSelect }) => {
  const navigate = useNavigate()
  const setVote = useSetRecoilState(setMyVotePerfumeState)

  const goToProduct = () => {
    navigate(`/product/${item.id}`)
  }

  const selectProduct = () => {
    setVote(item)
    navigate(-1)
  }

  return (
    <>
      <Container onClick={isSelect ? selectProduct : goToProduct}>
        <ProductImage src={item.image} />
        <ProductInfo>
          <CustomFont size={0.8} content={item.brand} $marginBt={0.2} />
          <CustomFont
            size={0.8}
            content={item.name}
            weight={800}
            $marginBt={0.2}
          />
          <CustomFont size={0.8} content={`${item.size}ml`} $marginBt={0.2} />
          <CustomFont size={0.8} content={`${item.price}원`} />
        </ProductInfo>
      </Container>
    </>
  )
}

const Container = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    background-color: ${palette.Gray300};
    opacity: 0.4;
  }
`

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: ${palette.Gray100};
`

const ProductInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

export default ProductListItem
