import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { PerfumeInterface } from '../../pages/Main'

const VoteProduct = ({ data }: { data: PerfumeInterface }) => {
  return (
    <Container>
      <ProductImage src={data.image} />
      <ProductInfo>
        <CustomFont content={data.brand} $marginBt={0.5} />
        <CustomFont content={data.name} />
      </ProductInfo>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ProductImage = styled.img`
  width: 25%;
  height: auto;
  background-color: white;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`

export default VoteProduct
