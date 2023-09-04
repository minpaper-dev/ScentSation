import React from 'react'
import { styled } from 'styled-components'
import ProfileItem from '../Profile/ProfileItem'
import CustomFont from '../../styles/CustomFont'

import palette from '../../styles/CustomColor'
import { useState } from 'react'
import CustomButtonModal from '../Custom/CustomButtonModal'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MY_UID } from '../../common/localstorage'
import { Rate } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { REVIEW_TAG } from '../../common/data'
import ProductItem from '../Product/ProductItem'
import type { ReviewInterface } from '../../pages/Main'

interface ReviewItemProps {
  data: ReviewInterface
  onDeleteVote?: { mutate: (params: { id: string }) => void }
  isNoProfile?: boolean
  isNoProduct?: boolean
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  data,
  onDeleteVote,
  isNoProfile,
  isNoProduct,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const uid = JSON.parse(localStorage.getItem(MY_UID) || 'null')

  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const onDeleteReview = async () => {
    if (onDeleteVote) {
      onDeleteVote.mutate({ id: data.id })
      setIsDeleteModal(false)
    }
  }

  const goToEdit = () => {
    navigate('/review/edit', { state: data })
  }

  return (
    <Container>
      {pathname !== '/' && uid === data?.user?.id && (
        <WrapButton>
          <Button onClick={goToEdit}>
            <CustomFont content={'수정'} />
          </Button>
          <Button onClick={() => setIsDeleteModal(true)}>
            <CustomFont content={'삭제'} />
          </Button>
        </WrapButton>
      )}

      {!isNoProduct && (
        <Link to={`/product/${data?.product?.id}`}>
          <ProductItem data={data.product} />
        </Link>
      )}

      {!isNoProfile && <ProfileItem data={data?.user} />}
      <Rate
        character={<StarFilled style={{ fontSize: '2rem', width: '0.6rem' }} />}
        value={data.rate}
        allowHalf
        disabled
      />
      <TagList>
        <CustomFont
          color={palette.Brown500}
          content={`# ${REVIEW_TAG[data?.gender || 'default']}`}
          $marginRi={1}
        />
        <CustomFont
          color={palette.Brown500}
          content={`# ${REVIEW_TAG[data?.season || 'default']}`}
          $marginRi={1}
        />
        <CustomFont
          color={palette.Brown500}
          content={`# ${REVIEW_TAG[data?.vitality || 'default']}`}
        />
      </TagList>
      <CustomFont size={1.2} content={data?.description} />
      {isDeleteModal && (
        <CustomButtonModal
          content={'정말로 리뷰를 삭제하시겠습니까?'}
          yesEvent={onDeleteReview}
          noEvent={() => setIsDeleteModal(false)}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 2rem;
`

const TagList = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px;
`

const WrapButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`

const Button = styled.button`
  margin: 0 0.5rem;
`

export default ReviewItem
