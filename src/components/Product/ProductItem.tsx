import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { PerfumeInterface } from '../../pages/Main'

const ProductItem = ({ data }: { data: PerfumeInterface }) => {
  return (
    <Product>
      <ProductImage src={data.image} />
      <ProductInfo>
        <CustomFont size={1.2} content={data.brand} $marginBt={1} />
        <CustomFont size={1.2} content={data.name} />
      </ProductInfo>
    </Product>
  )
}

const Product = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2rem 2rem 2rem 0.5rem;
  border-radius: 1rem;
  margin-bottom: 19px;
`

const ProductImage = styled.img`
  width: 40%;
  height: auto;
  background-color: white;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default ProductItem
