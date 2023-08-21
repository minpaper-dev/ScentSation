import { styled } from 'styled-components'
import ProfileItem from '../Profile/ProfileItem'
import CustomFont from '../../styles/CustomFont'
import CustomTags from '../../styles/CustomTags'
import palette from '../../styles/CustomColor'

const ReviewItem = ({ data, isNoProfile }) => {
  return (
    <Container>
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
