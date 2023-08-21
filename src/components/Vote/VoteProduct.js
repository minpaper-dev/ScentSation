import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'

const VoteProduct = ({ data }) => {
  return (
    <>
      <ProductImage src={data.image} />
      <ProductInfo>
        <CustomFont content={data.brand} $marginBt={0.5} />
        <CustomFont content={data.name} />
      </ProductInfo>
    </>
  )
}

const ProductImage = styled.img`
  width: 40%;
  height: auto;
  background-color: white;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default VoteProduct
