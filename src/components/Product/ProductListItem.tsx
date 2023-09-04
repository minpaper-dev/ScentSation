import React from 'react'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState, useRecoilState, RecoilState } from 'recoil'
import { setMyVotePerfumeState } from '../../recoil/selectors'
import { isSelectModal } from '../../recoil/atoms'
import { formatAmountWithCommas } from '../../utils/format'
import { PerfumeInterface } from '../../pages/Main'

interface ProductListItemProps {
  item: PerfumeInterface
  isSelect?: boolean | undefined
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  item,
  isSelect,
}) => {
  const navigate = useNavigate()
  const [myVotePerfume, setMyVotePerfume] = useRecoilState(
    setMyVotePerfumeState
  )
  const [, setIsSelectModal] = useRecoilState(isSelectModal)

  const goToProduct = () => {
    navigate(`/product/${item.id}`)
  }

  const selectProduct = () => {
    const newValue = { ...myVotePerfume, ...item }
    setMyVotePerfume(newValue)
    setIsSelectModal(false)
  }

  return (
    <>
      <Container onClick={isSelect ? selectProduct : goToProduct}>
        <ProductImage src={item.image} />
        <ProductInfo>
          <CustomFont size={1.2} content={item.brand} $marginBt={0.5} />
          <CustomFont
            size={1.2}
            content={item.name}
            weight={800}
            $marginBt={0.5}
          />
          <CustomFont size={1.2} content={`${item.size}ml`} $marginBt={0.5} />
          <CustomFont
            size={1.2}
            content={`${formatAmountWithCommas(item.price)}원`}
          />
        </ProductInfo>
      </Container>
    </>
  )
}

const Container = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

const ProductImage = styled.img`
  width: 7rem;
  height: 7rem;
  background-color: ${palette.Gray100};
`

const ProductInfo = styled.div`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
`

export default ProductListItem
