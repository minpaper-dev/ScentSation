import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import ProductListItem from '../Product/ProductListItem'
import CustomFont from '../../styles/CustomFont'
import { useNavigate } from 'react-router-dom'
import { FilterProductInterface } from '../../pages/Search'

interface SearchResultProps {
  filterProducts: FilterProductInterface
  isSelect?: boolean
}

const SearchResult: React.FC<SearchResultProps> = ({
  filterProducts,
  isSelect,
}) => {
  const navigate = useNavigate()

  const brandLength = filterProducts.brand ? filterProducts.brand.length : 0
  const nameLength = filterProducts.name.length

  if (brandLength + nameLength === 0) {
    return (
      <NoSearch>
        <CustomFont size={1.2} content={'검색 결과가 없습니다.'} />
      </NoSearch>
    )
  }
  return (
    <>
      <Container>
        {filterProducts?.brand?.map(item => (
          <SearchItem
            key={item.id}
            onClick={() =>
              navigate(`/brand/${item.id}`, { state: { name: item.name } })
            }
          >
            <BrandImage src={item.image} />
            <CustomFont content={item.name} $marginLf={1} />
          </SearchItem>
        ))}

        {filterProducts?.name?.map(item => (
          <ProductListItem key={item.id} item={item} isSelect={isSelect} />
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  padding-bottom: 10rem;
`

const NoSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${palette.Gray400};
`

const BrandImage = styled.img`
  width: 5rem;
  height: 2.5rem;
  background-color: ${palette.Gray100};
`

export default SearchResult
