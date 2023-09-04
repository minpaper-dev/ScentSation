import React from 'react'
import CustomCarousel from '../Custom/CustomCarousel'
import ReviewItem from '../Review/ReviewItem'
import type { ReviewInterface } from '../../pages/Main'

interface MainReviewProps {
  reviewData: ReviewInterface[]
}

const MainReview: React.FC<MainReviewProps> = ({ reviewData }) => {
  return (
    <CustomCarousel
      carouselList={reviewData}
      renderItem={(data: ReviewInterface) => {
        return <ReviewItem data={data} />
      }}
    />
  )
}

export default MainReview
