import { styled } from 'styled-components'
import ProfileItem from '../Profile/ProfileItem'
import CustomFont from '../../styles/CustomFont'
import CustomTags from '../../styles/CustomTags'

const ReviewItem = ({ data, isNoProfile }) => {
  return (
    <Container>
      {!isNoProfile && <ProfileItem data={data?.user} />}

      <TagList>
        <CustomTags content={data.gender} />
        <CustomTags content={data.season} />
        <CustomTags content={data.vitality} />
        {/* <CustomTags />
        <CustomTags /> */}
      </TagList>
      <CustomFont content={data?.description} />
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
