import { styled } from 'styled-components'
import ProfileItem from '../Profile/ProfileItem'
import CustomFont from '../../styles/CustomFont'

const ReviewItem = () => {
  return (
    <Container>
      <ProfileItem />
      <TagList>
        {/* <CustomTags />
        <CustomTags /> */}
      </TagList>
      <CustomFont
        content={
          '리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...리뷰 내용입니다. 어쩌구 저쩌구 ...'
        }
      />
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

export default ReviewItem
