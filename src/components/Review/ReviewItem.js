import { styled } from 'styled-components'
import ProfileItem from '../Profile/ProfileItem'
import CustomFont from '../../styles/CustomFont'
import CustomTags from '../../styles/CustomTags'
import palette from '../../styles/CustomColor'
import { useState } from 'react'
import CustomButtonModal from '../Custom/CustomButtonModal'
import useFirestore from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

const ReviewItem = ({ data, index, deleteReview, isNoProfile }) => {
  const navigate = useNavigate()
  const { deleteData } = useFirestore()
  const uid = JSON.parse(localStorage.getItem('uid'))

  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const onDeleteReview = async () => {
    await deleteData('review', data.id)
    deleteReview(index)
    setIsDeleteModal(false)
  }

  const goToEdit = () => {
    navigate('/review/edit', { state: data })
  }

  return (
    <Container>
      {uid === data.user.id && (
        <WrapButton>
          <Button onClick={goToEdit}>
            <CustomFont content={'수정'} />
          </Button>
          <Button onClick={() => setIsDeleteModal(true)}>
            <CustomFont content={'삭제'} />
          </Button>
        </WrapButton>
      )}

      {!isNoProfile && <ProfileItem data={data?.user} />}
      <TagList>
        <CustomFont
          color={palette.Gray200}
          content={`# ${data.gender}`}
          $marginRi={1}
        />
        <CustomFont
          color={palette.Gray200}
          content={`# ${data.season}`}
          $marginRi={1}
        />
        <CustomFont color={palette.Gray200} content={`# ${data.vitality}`} />
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
`

const Button = styled.button`
  margin: 0 0.5rem;
`

export default ReviewItem
